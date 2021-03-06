/* eslint-env jest */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Helpers from '~/test/helper'
import Component from '~/pages/_surahid/index.vue'

import MutationType from '~/store/mutation-type'
import Theme from '~/constant/theme'

import dummySurahInfo from './__mocks__/surah-info-item'
import dummySurahDetail from './__mocks__/surah-detail'

const localVue = createLocalVue()
localVue.use(Vuex)

const i18n = Helpers.initI18n(localVue)

const createStore = (dummyAllsurahList) => {
  let surahList = [dummySurahInfo]
  if (dummyAllsurahList) surahList = dummyAllsurahList
  return new Vuex.Store({
    state: {
      settingActiveTheme: Theme.LIGHT,
      surahDetail: dummySurahDetail,
      allSurahList: surahList
    },
    mutations: {
      [MutationType.SET_HEADER_TITLE] (state, data) {
        state.headerTitle = data
      },
      [MutationType.SET_THEME] (state, data) {
        state.settingActiveTheme = data
      }
    },
    actions: {
      fetchAllSurah: jest.fn().mockResolvedValue([dummySurahInfo]),
      fetchSurahById: jest.fn().mockResolvedValue(dummySurahDetail)
    }
  })
}

const createWrapper = ($mockRoute, dummyAllsurahList) => {
  let $route = {
    path: '/',
    params: {
      surahid: 2
    }
  }

  if ($mockRoute) {
    $route = $mockRoute
  }

  return shallowMount(Component, {
    sync: false,
    store: createStore(dummyAllsurahList),
    i18n,
    localVue,
    mocks: {
      $route
    }
  })
}

describe('pages _surahid.vue', () => {
  test('success mounting components', (done) => {
    const wrapper = createWrapper()
    expect(wrapper).toBeTruthy()
    expect(wrapper.vm.$route.params.surahid).toEqual(2)
    done()
  })

  test('computed for meta should fired', (done) => {
    const wrapper = createWrapper()
    // trigger change state with commit via mutations
    wrapper.vm.$store.commit(MutationType.SET_THEME, Theme.DARK)
    const title = wrapper.vm.$t('pageTitle.surahDetail', { surahName: 'Al-Fatihah', surahNumber: 2 })
    const expected = {
      title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'theme-color', name: 'theme-color', content: '#333' }
      ]
    }
    expect(wrapper.vm.metaHead).toEqual(expected)
    done()
  })

  test('computed isValidSurah should return true', (done) => {
    const wrapper = createWrapper()
    expect(wrapper.vm.isValidSurah).toBe(true)
    done()
  })

  test('computed isValidSurah should return false because too less', (done) => {
    const wrapper = createWrapper({
      path: '/',
      params: {
        surahid: 0
      }
    })
    expect(wrapper.vm.isValidSurah).toBe(false)
    done()
  })

  test('computed isValidSurah should return false because bigger', (done) => {
    const wrapper = createWrapper({
      path: '/',
      params: {
        surahid: 145
      }
    })
    expect(wrapper.vm.isValidSurah).toBe(false)
    done()
  })

  test('computed prevSurah should return null', (done) => {
    const wrapper = createWrapper(null, [])
    expect(wrapper.vm.prevSurah).toBeNull()
    done()
  })

  test('computed nextSurah should return null', (done) => {
    const wrapper = createWrapper(null, [])
    expect(wrapper.vm.nextSurah).toBeNull()
    done()
  })

  test('method onSuccess', (done) => {
    const wrapper = createWrapper()
    wrapper.vm.onSuccess({
      name_latin: 'dummy'
    })
    expect(wrapper.vm.loading).toBe(false)
    done()
  })
})
