export type ApprovalButtonType = 'approve' | 'reject' | 'onhold'

export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  type: ApprovalButtonType
  label?: string
  size?: ButtonSize
  disabled?: boolean
}

/** 审批状态，在不同组件中复用 */
export type ApprovalStatus = 'not-started' | 'in-progress' | 'completed' | 'rejected'

export interface ApprovalStep {
  id: number
  label: string
  status: ApprovalStatus
}

export interface StatusTagProps {
  type: ApprovalStatus
  label?: string
}
