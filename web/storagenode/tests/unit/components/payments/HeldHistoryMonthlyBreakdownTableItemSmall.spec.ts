// Copyright (C) 2020 Storj Labs, Inc.
// See LICENSE for copying information.

import HeldHistoryMonthlyBreakdownTableItemSmall from '@/app/components/payments/HeldHistoryMonthlyBreakdownTableItemSmall.vue';

import { SatelliteHeldHistory } from '@/storagenode/payouts/payouts';
import { createLocalVue, shallowMount } from '@vue/test-utils';

const localVue = createLocalVue();

localVue.filter('centsToDollars', (cents: number): string => {
    return `$${(cents / 100).toFixed(2)}`;
});

describe('HeldHistoryMonthlyBreakdownTableSmall', (): void => {
    it('renders correctly with actual values',  async (): Promise<void> => {
        const wrapper = shallowMount(HeldHistoryMonthlyBreakdownTableItemSmall, {
            propsData: {
                heldHistoryItem: new SatelliteHeldHistory(
                    '1',
                    'name1',
                    6,
                    50000,
                    7333880,
                    7852235,
                    757576,
                    new Date(2020, 1, 20),
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
