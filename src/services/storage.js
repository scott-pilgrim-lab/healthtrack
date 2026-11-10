// ============================================================================
// Data access layer
// ----------------------------------------------------------------------------
// Every read and write in the app goes through this file. Phase 1 keeps the
// data in localStorage. In Phase 2 only the bodies of these functions change
// to fetch() calls against the backend, for example:
//
//   getEntries(type)        ->  GET    /api/:type
//   addEntry(type, entry)   ->  POST   /api/:type
//   deleteEntry(type, id)   ->  DELETE /api/:type/:id
//
// The functions already return Promises so the components that call them
// (with .then / await) will not need to change when the real API arrives.
// ============================================================================
import { buildSeedData } from '../data/seedData'
import { toDateKey } from '../utils/date'

const PREFIX = 'healthtrack'
const SEEDED_KEY = `${PREFIX}:seeded`
const keyFor = (type) => `${PREFIX}:${type}`

// --- low-level helpers (private to this file) -------------------------------

function read(type) {
  try {
    const raw = localStorage.getItem(keyFor(type))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // Corrupted JSON or storage blocked (e.g. private mode): act as empty.
    return []
  }
}

function write(type, entries) {
  try {
    localStorage.setItem(keyFor(type), JSON.stringify(entries))
  } catch {
    // Storage full or unavailable. The UI still updates for this session.
  }
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

// Seed the sample data once. A flag is stored so that a user who deletes
// everything does not get the samples back on the next visit.
function seedOnFirstLoad() {
  try {
    if (localStorage.getItem(SEEDED_KEY)) return
    const seed = buildSeedData()
    Object.entries(seed).forEach(([type, entries]) => write(type, entries))
    localStorage.setItem(SEEDED_KEY, 'true')
  } catch {
    // Ignore: without storage the app simply starts empty.
  }
}

// Newest date first; entries on the same day keep newest-added first.
const byNewest = (a, b) =>
  b.date.localeCompare(a.date) || (b.createdAt ?? '').localeCompare(a.createdAt ?? '')

// --- public API --------------------------------------------------------------

/** Get all entries of a type: 'activities' | 'meals' | 'workouts'. */
export async function getEntries(type) {
  seedOnFirstLoad()
  return read(type).sort(byNewest)
}

/** Save a new entry and return it with its generated id. */
export async function addEntry(type, entry) {
  const created = { ...entry, id: createId(), createdAt: new Date().toISOString() }
  write(type, [created, ...read(type)])
  return created
}

/** Delete one entry by id. */
export async function deleteEntry(type, id) {
  write(
    type,
    read(type).filter((entry) => entry.id !== id),
  )
}

/** Throw away all saved entries and load the sample data again. */
export async function resetToSampleData() {
  try {
    localStorage.removeItem(SEEDED_KEY)
  } catch {
    // Nothing to reset without storage.
  }
  seedOnFirstLoad()
}

/** Save a message from the contact form (Phase 2: POST /api/messages). */
export async function sendMessage(message) {
  return addEntry('messages', { ...message, date: toDateKey() })
}
