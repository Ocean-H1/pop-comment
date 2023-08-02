/**
 * @Author: OceanH
 * @Date: 2023-08-02 22:55:08
 */
import { withInstall } from '~/util'
import Tabs from './tabs.vue'

export * from './interface'
export * from './constants'
export type TabsInstance = InstanceType<typeof Tabs>
export const PTabs = withInstall(Tabs)
export default PTabs
