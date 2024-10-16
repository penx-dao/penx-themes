import { open } from '@tauri-apps/plugin-shell'

export const previewSite = () => {
  open('http://localhost:4321/')
}
