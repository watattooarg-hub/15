import { RsvpResponse } from '../components/RsvpSection';

const STORAGE_KEY = 'ambifest_all_rsvps';
const GUEST_STORAGE_KEY = 'ambifest_guest_rsvp';

const DEMO_NAMES = [
  'Valentina Rossi',
  'Mateo Fernández',
  'Ignacio Suárez',
  'Familia Arguello',
];

const DEMO_IDS = ['1', '2', '3', '4', 'demo-1', 'demo-2', 'demo-3', 'demo-4'];

function isDemoGuest(item: RsvpResponse): boolean {
  if (DEMO_IDS.includes(item.id)) return true;
  for (const name of DEMO_NAMES) {
    if (item.name.toLowerCase().includes(name.toLowerCase())) return true;
  }
  return false;
}

export const rsvpService = {
  // Get all RSVPs from server API if available, otherwise from localStorage
  async getAll(): Promise<RsvpResponse[]> {
    let list: RsvpResponse[] = [];

    // 1. Try server API first (shared across all devices in full-stack mode)
    try {
      const res = await fetch('/api/rsvps');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          list = data.filter((item) => !isDemoGuest(item));
          // Sync with local storage for offline resilience
          localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
          return list;
        }
      }
    } catch {
      // Server not reachable or static host, fallback to localStorage
    }

    // 2. Read from localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: RsvpResponse[] = JSON.parse(raw);
        list = parsed.filter((item) => !isDemoGuest(item));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
    } catch (e) {
      console.error('Error loading rsvps from localStorage', e);
    }

    return list;
  },

  // Save or update an RSVP
  async save(rsvp: RsvpResponse): Promise<RsvpResponse[]> {
    // Save current guest locally
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(rsvp));
    } catch (e) {
      console.error(e);
    }

    // 1. Try sending to server API
    let serverUpdatedList: RsvpResponse[] | null = null;
    try {
      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvp),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          serverUpdatedList = data.filter((item) => !isDemoGuest(item));
        }
      }
    } catch {
      // Server not reachable
    }

    if (serverUpdatedList) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serverUpdatedList));
      return serverUpdatedList;
    }

    // 2. Update local storage
    const currentList = await this.getAll();
    const existingIndex = currentList.findIndex(
      (r) =>
        r.id === rsvp.id ||
        (rsvp.name && r.name.trim().toLowerCase() === rsvp.name.trim().toLowerCase())
    );

    let updated: RsvpResponse[];
    if (existingIndex >= 0) {
      updated = [...currentList];
      updated[existingIndex] = rsvp;
    } else {
      updated = [rsvp, ...currentList];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  // Delete single RSVP by id
  async delete(id: string): Promise<RsvpResponse[]> {
    try {
      await fetch(`/api/rsvps/${id}`, { method: 'DELETE' });
    } catch {
      // Server not reachable
    }

    const currentList = await this.getAll();
    const updated = currentList.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  // Clear all RSVPs
  async clearAll(): Promise<void> {
    try {
      await fetch('/api/rsvps', { method: 'DELETE' });
    } catch {
      // Server not reachable
    }

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(GUEST_STORAGE_KEY);
  },

  // Get current user's local RSVP if previously submitted
  getCurrentGuestRsvp(): RsvpResponse | null {
    try {
      const raw = localStorage.getItem(GUEST_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
    return null;
  },
};
