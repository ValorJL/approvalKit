import { mount } from '@vue/test-utils'
import ApprovalButton from '../../src/components/ApprovalButton.vue'
// 确保当 type 是 'approve'、'reject' 或 'pending' 时，按钮的默认文本是正确的。
test('renders default labels correctly', () => {
  const wrapperApprove = mount(ApprovalButton, { props: { type: 'approve' } })
  expect(wrapperApprove.text()).toBe('通过')

  const wrapperReject = mount(ApprovalButton, { props: { type: 'reject' } })
  expect(wrapperReject.text()).toBe('拒绝')

  const wrapperPending = mount(ApprovalButton, { props: { type: 'pending' } })
  expect(wrapperPending.text()).toBe('待定')
})

// 确保用户可以通过 label prop 自定义按钮的文本。
test('accepts custom labels', () => {
  const wrapper = mount(ApprovalButton, { props: { type: 'approve', label: '同意' } })
  expect(wrapper.text()).toBe('同意')
})

// 确保按钮的 type 决定了正确的样式。
test('applies correct classes based on type', () => {
  const wrapperApprove = mount(ApprovalButton, { props: { type: 'approve' } })
  expect(wrapperApprove.classes()).toContain('approve-button')

  const wrapperReject = mount(ApprovalButton, { props: { type: 'reject' } })
  expect(wrapperReject.classes()).toContain('reject-button')

  const wrapperPending = mount(ApprovalButton, { props: { type: 'pending' } })
  expect(wrapperPending.classes()).toContain('pending-button')
})

// 当用户点击按钮时，组件应该触发 click 事件。
test('emits click event when clicked', async () => {
  const wrapper = mount(ApprovalButton, { props: { type: 'approve' } })
  await wrapper.trigger('click')
  expect(wrapper.emitted()).toHaveProperty('click')
})
