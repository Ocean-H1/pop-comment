/**
 * @Author: OceanH
 * @Date: 2023-08-04 22:08:06
 */
import { withInstall } from '~/util'
import Editor from './editor.vue'

export type EditorInstance = InstanceType<typeof Editor>
export const PEditor = withInstall(Editor)
export default PEditor
