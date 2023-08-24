<template>
  <div>
    <div class="flex w-full mb-6 overflow" :class="{'flex-row-reverse': inversion, 'jq': !inversion}">
      <div class="flex items-center justify-center flex-shrink-0 h-8 overflow rounded-full basis-8 ml-2 img-wrap"><img src="../../assets/3.png" alt="" v-if="inversion"><img src="../../assets/4.png" alt="" v-else></div>
      <div class="overflow text-sm" :class="{'items-end': inversion, 'items-start': !inversion}">
        <p class="time">{{dateTime}}</p>
        <div class="flex items-end gap-1 mt-2" :class="{'flex-row-reverse': inversion, 'flex-row': !inversion}">
          <div class="text-black text-wrap rounded-md px-3 py-2 message-request">
            <div class="leading-relaxed break-words">
              <div class="whitespace-pre-wrap" v-if="inversion" v-text="displayText" />
              <div v-else class="markdown-body" v-html="displayText" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'
import 'katex/dist/katex.min.css'
import '@/styles/lib/tailwind.css'
import '@/styles/lib/highlight.less'
import '@/styles/lib/github-markdown.less'
import '@/styles/global.less'

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ? language : ''
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  },
})

mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })
mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })

function highlightBlock(str, lang) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">${t('chat.copyCode')}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

export default {
  props: {
    inversion: {
      type: Boolean,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    dateTime: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  name: 'CustomText',
  computed: {
    displayText() {
      if (this.inversion) return this.text
      return mdi.render(this.text)
    }
  }
}

</script>
<style lang="less" scoped>
@import url(./style.less);

</style>
