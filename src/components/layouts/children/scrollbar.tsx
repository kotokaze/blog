import { useScrollProgress } from "@/hooks/useScrollProgress"

const Scrollbar: React.VFC = () => {
  const scroll = useScrollProgress()

  return pug`
    if (scroll.max > 1e3)
      progress(value=scroll.value, max=scroll.max).uk-progress.uk-margin-remove-top
  `
}

export default Scrollbar
