import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ApprovalButton from '../../src/components/ApprovalButton.vue'

describe('ApprovalButton.vue', () => {
  it('默认label文本正确', () => {
    const wrapperApprove = mount(ApprovalButton, { props: { type: 'approve' } })
    expect(wrapperApprove.text()).toBe('通过')

    const wrapperReject = mount(ApprovalButton, { props: { type: 'reject' } })
    expect(wrapperReject.text()).toBe('拒绝')

    const wrapperPending = mount(ApprovalButton, { props: { type: 'onhold' } })
    expect(wrapperPending.text()).toBe('待定')
  })

  it('允许自定义label文本', () => {
    const wrapper = mount(ApprovalButton, { props: { type: 'approve', label: '同意' } })
    expect(wrapper.text()).toBe('同意')
  })

  it('动态绑定类名正确', () => {
    const types = ['approve', 'reject', 'pending']
    const expectedClasses = ['approve-button', 'reject-button', 'pending-button']

    types.forEach((type, index) => {
      const wrapper = mount(ApprovalButton, { props: { type } })
      expect(wrapper.classes()).toContain(expectedClasses[index])
    })
  })

  it('点击事件', async () => {
    const wrapper = mount(ApprovalButton, { props: { type: 'approve' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
