// @vitest-environment jsdom

import { readFileSync } from 'node:fs';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

const scriptSource = readFileSync(new URL('../script.js', import.meta.url), 'utf8');

const dashboardMarkup = `
  <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Open navigation"></button>
  <aside class="sidebar"></aside>
  <a class="nav-item" href="#overview">Overview</a>
  <button id="new-project-button" type="button">New project</button>
  <button id="view-all-button" type="button">View all</button>
  <button id="activity-button" type="button">Activity</button>
  <div class="toast" role="status" aria-live="polite" aria-hidden="true"></div>
`;

const loadScript = () => {
  new Function(scriptSource)();
};

describe('dashboard script', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = dashboardMarkup;
    loadScript();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  describe('showToast behavior', () => {
    it('shows the supplied message and status state', () => {
      document.querySelector('#new-project-button').click();

      const toast = document.querySelector('.toast');
      expect(toast.textContent).toBe('Project creation is available in the full workspace.');
      expect(toast.classList.contains('is-visible')).toBe(true);
      expect(toast.getAttribute('aria-hidden')).toBe('false');
    });

    it('hides the toast after the 3200ms display boundary', () => {
      document.querySelector('#view-all-button').click();
      vi.advanceTimersByTime(3199);
      expect(document.querySelector('.toast').classList.contains('is-visible')).toBe(true);

      vi.advanceTimersByTime(1);
      const toast = document.querySelector('.toast');
      expect(toast.classList.contains('is-visible')).toBe(false);
      expect(toast.getAttribute('aria-hidden')).toBe('true');
    });

    it('replaces an earlier message and resets its timer', () => {
      document.querySelector('#new-project-button').click();
      vi.advanceTimersByTime(3000);
      document.querySelector('#activity-button').click();
      vi.advanceTimersByTime(199);

      const toast = document.querySelector('.toast');
      expect(toast.textContent).toBe('Activity log is available in the full workspace.');
      expect(toast.classList.contains('is-visible')).toBe(true);

      vi.advanceTimersByTime(3001);
      expect(toast.classList.contains('is-visible')).toBe(false);
    });
  });

  describe('navigation behavior', () => {
    it('opens the sidebar and updates its accessible button state', () => {
      document.querySelector('.menu-toggle').click();

      const menuToggle = document.querySelector('.menu-toggle');
      expect(document.querySelector('.sidebar').classList.contains('is-open')).toBe(true);
      expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
      expect(menuToggle.getAttribute('aria-label')).toBe('Close navigation');
    });

    it('closes the sidebar and restores the open-navigation state', () => {
      const menuToggle = document.querySelector('.menu-toggle');
      menuToggle.click();
      menuToggle.click();

      expect(document.querySelector('.sidebar').classList.contains('is-open')).toBe(false);
      expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
      expect(menuToggle.getAttribute('aria-label')).toBe('Open navigation');
    });

    it('closes the sidebar when a navigation item is selected', () => {
      document.querySelector('.menu-toggle').click();
      document.querySelector('.nav-item').click();

      expect(document.querySelector('.sidebar').classList.contains('is-open')).toBe(false);
      expect(document.querySelector('.menu-toggle').getAttribute('aria-expanded')).toBe('false');
      expect(document.querySelector('.menu-toggle').getAttribute('aria-label')).toBe('Open navigation');
    });
  });

  describe('action feedback', () => {
    it('shows feedback for the new project action', () => {
      document.querySelector('#new-project-button').click();
      expect(document.querySelector('.toast').textContent).toContain('Project creation');
    });

    it('shows feedback for the view-all action', () => {
      document.querySelector('#view-all-button').click();
      expect(document.querySelector('.toast').textContent).toBe('Showing the latest five sample projects.');
    });

    it('shows feedback for the activity log action', () => {
      document.querySelector('#activity-button').click();
      expect(document.querySelector('.toast').textContent).toBe('Activity log is available in the full workspace.');
    });

    it('ignores an unrelated control instead of changing the toast', () => {
      const unrelatedButton = document.createElement('button');
      unrelatedButton.type = 'button';
      unrelatedButton.textContent = 'Unrecognized action';
      document.body.append(unrelatedButton);

      unrelatedButton.click();

      const toast = document.querySelector('.toast');
      expect(toast.textContent).toBe('');
      expect(toast.classList.contains('is-visible')).toBe(false);
      expect(toast.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('missing-element edge cases', () => {
    it('does not throw when optional dashboard elements are absent', () => {
      document.body.innerHTML = '';
      expect(() => loadScript()).not.toThrow();
    });

    it('does not throw when navigation exists without a menu toggle', () => {
      document.body.innerHTML = '<aside class="sidebar"></aside><a class="nav-item" href="#overview">Overview</a>';
      expect(() => loadScript()).not.toThrow();
      document.querySelector('.nav-item').click();
      expect(document.querySelector('.sidebar').classList.contains('is-open')).toBe(false);
    });
  });
});
