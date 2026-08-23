import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
    computeCommissionPaise,
    eligibilityDate,
    isEligible,
    splitDue,
    netOfEarning,
    sumNetPaise,
} from '../lib/payouts.core.mjs'

test('commission rounds half-up in integer paise', () => {
    assert.equal(computeCommissionPaise(9999, 10), 1000)
    assert.equal(computeCommissionPaise(125, 10), 13) // 12.5 -> 13
    assert.equal(computeCommissionPaise(124, 10), 12)
    assert.equal(computeCommissionPaise(0, 10), 0)
    assert.equal(computeCommissionPaise(10000, 0), 0)
})

test('eligibility is exactly window days after capture', () => {
    const t = new Date('2026-08-01T10:00:00Z')
    assert.equal(eligibilityDate(t).toISOString(), '2026-08-08T10:00:00.000Z')
})

test('isEligible respects status and inclusive boundary', () => {
    const t = new Date('2026-08-08T10:00:00Z')
    const e = { status: 'DUE', eligibleAt: t }
    assert.equal(isEligible(e, new Date(t.getTime() - 1)), false)
    assert.equal(isEligible(e, t), true)
    assert.equal(isEligible({ ...e, status: 'PAID' }, new Date()), false)
    assert.equal(isEligible({ ...e, status: 'PROCESSING' }, t), false)
})

test('splitDue partitions rows by eligibility', () => {
    const now = new Date('2026-08-09T00:00:00Z')
    const rows = [
        { status: 'DUE', eligibleAt: new Date('2026-08-01T00:00:00Z') },
        { status: 'DUE', eligibleAt: new Date('2026-08-20T00:00:00Z') },
        { status: 'PAID', eligibleAt: new Date('2026-08-01T00:00:00Z') },
    ]
    const { dueNow, upcoming } = splitDue(rows, now)
    assert.equal(dueNow.length, 1)
    assert.equal(upcoming.length, 2)
})

test('net and sums never go negative', () => {
    assert.equal(netOfEarning({ grossPaise: 100, commissionPaise: 40 }), 60)
    assert.equal(netOfEarning({ grossPaise: 100, commissionPaise: 150 }), 0)
    assert.equal(sumNetPaise([{ grossPaise: 100, commissionPaise: 40 }, { grossPaise: 200, commissionPaise: 50 }]), 210)
})
