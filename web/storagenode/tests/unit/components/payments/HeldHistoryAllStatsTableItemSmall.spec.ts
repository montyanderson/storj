// Copyright (C) 2020 Storj Labs, Inc.
// See LICENSE for copying information.

import HeldHistoryAllStatsTableItemSmall from '@/app/components/payments/HeldHistoryAllStatsTableItemSmall.vue';

import { SatelliteHeldHistory } from '@/storagenode/payouts/payouts';
import { createLocalVue, shallowMount } from '@vue/test-utils';

const localVue = createLocalVue();

localVue.filter('centsToDollars', (cents: number): string => {
    return `$${(cents / 100).toFixed(2)}`;
});

describe('HeldHistoryAllStatsTableItemSmall', (): void => {
    it('renders correctly with actual values',  async (): Promise<void> => {
        const testJoinAt = new Date(Date.UTC(2020, 0, 27));

        const wrapper = shallowMount(HeldHistoryAllStatsTableItemSmall, {
            propsData: {
                heldHistoryItem: new SatelliteHeldHistory(
                    '1',
                    'name1',
                    6,
                    50000,
                    7333880,
                    7852235,
                    757576,
                    testJoinAt,
                ),
            },
            localVue,
        });

        expect(wrapper).toMatchSnapshot();

        wrapper.find('.expand').trigger('click');

        await localVue.nextTick();

        expect(wrapper).toMatchSnapshot();

        wrapper.find('.hide').trigger('click');

        await localVue.nextTick();

        expect(wrapper).toMatchSnapshot();
    });
});
