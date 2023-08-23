<template>
  <div class="wrap aa">
    <div class="main">
      <div class="left">
        <div class="top">
          <img src="../assets/1.png" alt="" class="fl">
          <div class="fl">
            <div class="com">德益康</div>
            <div class="project">药品智能知识库</div>
          </div>
        </div>
        <div class="add-chat">新建聊天</div>
        <div class="item" v-for="(v, i) in historyList" :key="i" :class="{selected: i === selectedIndex}" @click="switchChat(i)">
          <i class="icon fl"></i>
          <p class="name fl">{{ v.title }}</p>
          <i class="del fr"></i>
          <i class="edit fr"></i>
        </div>
      </div>
      <div class="right">
        <div class="flex flex-col w-full h-full">
          <main class="flex-1 overflow">
            <div class="h-full overflow overflow-y-auto">
              <div class="w-full p-4" style="padding: 20px 30px;">
                <div class="flex w-full mb-6 overflow" v-for="v in currentChat.data" :key="v.dateTime" :class="{'flex-row-reverse': v.inversion, 'jq': !v.inversion}">
                  <div class="flex items-center justify-center flex-shrink-0 h-8 overflow rounded-full basis-8 ml-2 img-wrap"><img src="../assets/3.png" alt="" v-if="v.inversion"><img src="../assets/4.png" alt="" v-else></div>
                  <div class="overflow text-sm" :class="{'items-end': v.inversion, 'items-start': !v.inversion}">
                    <p class="time">{{v.dateTime}}</p>
                    <div class="flex items-end gap-1 mt-2" :class="{'flex-row-reverse': v.inversion, 'flex-row': !v.inversion}">
                      <div class="text-black text-wrap rounded-md px-3 py-2 message-request">
                        <div class="leading-relaxed break-words">
                          <div class="whitespace-pre-wrap">{{v.text}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <footer class="p-4"></footer>
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

export default {
  data() {
    return {
      chatList: [{
          "uuid": 1692770461252,
          "data": [{
              "dateTime": "2023/8/23 14:01:17",
              "text": "感冒灵",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "感冒灵",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/23 14:01:27",
              "text": "感冒灵是一种中药,由多种草药配制而成。其主要成分包括三叉苦、金盏银盘、野菊花、对乙酰氨基酚、扑尔敏等。感冒灵主要用于治疗普通感冒、流感等病症。\n\n感冒灵具有解热镇痛、抗组织胺、抗炎等作用,可以缓解头痛、发热、鼻塞、流涕、咽痛等症状。感冒灵还可以促进鼻涕和痰液的排出,使感冒症状更快地缓解。\n\n感冒灵是一种非处方药,但使用时应按照说明书或医生的指导使用,避免超量或长期使用。如果有任何疑问或不适,应立即停止使用并咨询医生。",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "感冒灵",
                "options": {}
              }
            },
            {
              "dateTime": "2023/8/23 14:01:36",
              "text": "急支糖浆",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "急支糖浆",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/23 14:01:42",
              "text": "急支糖浆是一种中成药，主要成分包括麻黄、杏仁、石膏、蔗糖等。它具有清热化痰、宣肺止咳的功效，主要用于治疗外感咳嗽、痰多气喘等症状。\n\n使用急支糖浆时，建议按照说明书上的剂量使用。若症状持续未改善，请及时就医。在使用过程中，若出现不良反应，应立即停止使用，并就诊于医院。",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "急支糖浆",
                "options": {}
              }
            }
          ]
        },
        {
          "uuid": 1692236763045,
          "data": [{
              "dateTime": "2023/8/17 09:46:03",
              "text": "易瑞沙",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "易瑞沙",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/17 09:46:10",
              "text": "我不确定你想要问什么关于“易瑞沙”,因为这个名称可能指的是多种不同的事物。可以请你提供更多的上下文或信息吗?这样我才能更好地回答你的问题。\n\n数据来源：\n\n>",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "易瑞沙",
                "options": {}
              }
            },
            {
              "dateTime": "2023/8/17 09:46:24",
              "text": "易瑞沙",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "易瑞沙",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/17 09:47:05",
              "text": "易瑞沙（吉非替尼片）是一种治疗晚期或转移性非小细胞肺癌的靶向药物，其化学名称为N-(3-氯-4-氟苯基)-7-甲氧基-6-(3-吗啉丙氧基)喹唑啉-4-胺，化学结构式为分子式：C22H24ClFN4O3，分子量：446.90。易瑞沙的性状为褐色，圆形，薄膜衣片，一面印有“IRESSA250”。易瑞沙的贮藏条件为30℃以下保存，包装为PVC/铝箔泡罩包装，10片/盒或30片/盒。易瑞沙的有效期为36个月。易瑞沙的执行标准为进口药品注册标准JX20170169，批准文号为H20181042。易瑞沙的生产企业为Kagamiishi Plant, Nipro Pharma Corporation。特罗凯（盐酸厄洛替尼片）的化学名称为N-(3-乙炔苯基)-6,7-双(2-甲氧乙氧基)-4-喹唑啉胺盐酸盐，化学结构式为分子式：C22H23N3O4·HCl，分子量：429.90。特罗凯的规格为100mg或150mg。特罗凯的用法用量为每日150mg，至少在饭前1小时或饭后2小时服用。特罗凯的注意事项包括间质性肺病、肝功能衰竭或胃肠穿孔的患者应停止使用特罗凯，同时使用CYP3A4强抑制剂如阿扎那韦、克拉霉素、印地那韦、伊曲康唑、酮康唑、奈法唑酮、奈非那韦、利托那韦、沙奎那韦、泰利霉素、醋竹桃霉素（TAO）、伏立康唑等药物或者葡萄柚、葡萄柚汁时应考虑减量，否则可出现严重的不良反应。\n\n数据来源：\n\n>出处 [1] 药品3W3千条.md：\n\n易瑞沙（吉非替尼片）的注意事项 当考虑本品用于晚期或转移性 NSCLC 患者的治疗时, 应对所有患者的肿瘤组织进行 EGFR 突变检测。确定具有 EGFR 基因敏感突变的患者推荐本品治疗。如果肿瘤标本不可评估, 则可使用从血液(血浆)标本中获得的循环肿瘤 DNA(ctDNA)。 只能使用经论证可用于测定肿瘤或 ctDNA 的 EGFR 突变状态的检测方法, 检测方法须稳定、可靠并且灵敏，以避免出现假阴性或假阳性的测定结果。 间质性肺病 观察到接受本品治疗的患者发生间质性肺病，可急性发作，有死亡病例报告(见【不良反应】)。如果患者呼吸道症状恶化，如呼吸困难，咳嗽，发热，应中断本品治疗，马上进行检查。当证实有间质性肺病时，应停止使用本品，并对患者进行相应的治疗。\n\n相关度：404\n\n>出处 [2] 药品3W3千条.md：\n\n易瑞沙（吉非替尼片）的化学成份 化学名称：N-(3-氯-4-氟苯基)-7-甲氧基-6-(3-吗啉丙氧基)喹唑啉-4-胺 化学结构式： 分子式：C22H24ClFN4O3 分子量：446.90 易瑞沙（吉非替尼片）的性状 褐色，圆形，薄膜衣片；一面印有“IRESSA250” 易瑞沙（吉非替尼片）的贮藏 30 ℃ 以下保存。 易瑞沙（吉非替尼片）的包装 PVC/铝箔泡罩包装。10 片/盒，30 片/盒 易瑞沙（吉非替尼片）的有效期 36 个月 易瑞沙（吉非替尼片）的执行标准 进口药品注册标准 JX20170169 易瑞沙（吉非替尼片）的批准文号 H20181042 易瑞沙（吉非替尼片）的生产企业 Kagamiishi Plant, Nipro Pharma Corporation 特罗凯（盐酸厄洛替尼片） 特罗凯（盐酸厄洛替尼片）的成份 本品主要成份为盐酸厄洛替尼。 化学名称：N-(3-乙炔苯基)-6,7-双(2-甲氧乙氧基)-4-喹唑啉胺盐酸盐 化学结构式： 分子式：C22H23N3O4·HCl分子量：429.90 特罗凯（盐酸厄洛替尼片）的规格 100 mg；150 mg 特罗凯（盐酸厄洛替尼片）的用法用量 本品必须在有此类药物使用经验的医生指导下使用。 在考虑本品用于局部晚期或转移性 NSCLC 患者一线治疗或维持治疗前，应对患者进行 EGFR 突变状态检测。 厄洛替尼单药用于非小细胞肺癌的推荐剂量为 150 mg/日，至少在饭前 1 小时或饭后 2 小时服用。持续用药直到疾病进展或出现不能耐受的毒性反应。目前无证据表明进展后继续使用本品治疗能使患者受益。 剂量调整 患者出现新的急性发作或进行性的肺部症状，如呼吸困难、咳嗽和发热，应暂停厄洛替尼治疗进行诊断评估。如果确诊是 ILD（间质性肺病），则应停用厄洛替尼，并给予适当的治疗（参见【注意事项】警告-肺毒性）。肝功能衰竭或胃肠穿孔的患者应停止使用厄洛替尼。脱水且有肾衰竭风险的患者、患严重大疱、水泡或剥脱性皮肤病的患者、患急性/正在加重眼疾的患者，应中断或停止使用厄洛替尼（参见【注意事项】）。 腹泻通常可用洛哌丁胺控制。严重腹泻洛哌丁胺无效或出现脱水的患者需要剂量减量和暂时停止治疗。严重皮肤反应的患者也需要剂量减量和暂时停止治疗。 如果必须减量，厄洛替尼应该每次减少 50 mg。 同时使用 CYP3A4 强抑制剂如阿扎那韦、克拉霉素、印地那韦、伊曲康唑、酮康唑、奈法唑酮、奈非那韦、利托那韦、沙奎那韦、泰利霉素、醋竹桃霉素（TAO）、伏立康唑等药物或者葡萄柚、葡萄柚汁时应考虑减量，否则可出现严重的不良反应。同样，同时使用 CYP3A4 与 CYPIA2 共同抑制剂（如环丙沙星）的患者，若出现严重不良反应，应减少厄洛替尼用量（参见【药物相互作用】）。\n\n相关度：389\n\n",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "易瑞沙",
                "options": {}
              }
            },
            {
              "dateTime": "2023/8/17 10:19:26",
              "text": "风动旛动",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "风动旛动",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/17 10:19:36",
              "text": "\"风动幡动\" (fēng dòng fān dòng) is a Chinese phrase that literally means \"wind moves the flag.\" It is often used to describe the effects of wind on a flag, which can cause the flag to move or unfurl in a way that is not预期或未经许可。\n\nThe phrase can also be used metaphorically to describe the impact of external factors on a person or a group, with the wind symbolizing the forces outside that can cause change or disruption.\n\nIn general, \"风动幡动\" is a reminder that the effects of the surrounding world can be significant, and that we must be prepared to adapt or respond to them in order to achieve our goals.\n\n数据来源：\n\n>",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "风动旛动",
                "options": {}
              }
            },
            {
              "dateTime": "2023/8/23 13:49:55",
              "text": "多吉美",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "多吉美",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/23 13:50:04",
              "text": "多吉美（Dorgi）是一个来自藏族的传统食品，主要流行于西藏、四川、云南和青海等藏区。多吉美是一种圆形的青稞面饼，用酥油、面粉、牛肉等原料制作而成，口感香脆，内软外酥。\n\n多吉美源于藏传佛教格鲁派，据说在藏传佛教的早期，有一位名叫多吉美的修行者，他的修行成果被称为“多吉美”，因此多吉美这个名字与其修行成果密切相关。\n\n多吉美在藏族人民的生活中具有重要意义，它通常是藏餐中的主食之一。在藏族节日和庆典活动中，多吉美也常常被作为一道美食享用。",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "多吉美",
                "options": {}
              }
            },
            {
              "dateTime": "2023/8/23 13:50:26",
              "text": "多吉美",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "多吉美",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/23 13:50:35",
              "text": "多吉美（Dorgi）是一个来自藏族的传统食品，主要流行于西藏、四川、云南和青海等藏区。多吉美是一种圆形的青稞面饼，用酥油、面粉、牛肉等原料制作而成，口感香脆，内软外酥。\n\n多吉美源于藏传佛教格鲁派，据说在藏传佛教的早期，有一位名叫多吉美的修行者，他的修行成果被称为“多吉美”，因此多吉美这个名字与其修行成果密切相关。\n\n多吉美在藏族人民的生活中具有重要意义，它通常是藏餐中的主食之一。在藏族节日和庆典活动中，多吉美也常常被作为一道美食享用。\n\n数据来源：\n\n>",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "多吉美",
                "options": {}
              }
            },
            {
              "dateTime": "2023/8/23 13:51:05",
              "text": "艾弗莎",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "艾弗莎",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/23 13:51:08",
              "text": "我不确定你想要问什么关于“艾弗莎”。请提供更多上下文或问题的细节,以便我可以更好地回答您的问题。\n\n数据来源：\n\n>",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "艾弗莎",
                "options": {}
              }
            },
            {
              "dateTime": "2023/8/23 13:51:15",
              "text": "美罗华",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "美罗华",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/23 13:51:20",
              "text": "美罗华（Melanostagma）是一种存在于乌龟身上的名贵中草药。它的干燥壳片通常用于治疗风湿病、皮肤瘙痒和湿疹等病症。美罗华具有显著的抗炎、抗菌和镇痛作用，因其具有独特的香气和味道，而受到许多人的喜爱。然而，使用美罗华时需遵循专业医生的建议，避免因个人差异而引发的不良反应。\n\n数据来源：\n\n>",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "美罗华",
                "options": {}
              }
            },
            {
              "dateTime": "2023/8/23 13:51:30",
              "text": "易瑞沙",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "易瑞沙",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/23 13:52:05",
              "text": "易瑞沙（吉非替尼片）是一种治疗晚期或转移性非小细胞肺癌的靶向药物，其化学名称为N-(3-氯-4-氟苯基)-7-甲氧基-6-(3-吗啉丙氧基)喹唑啉-4-胺，化学结构式为分子式：C22H24ClFN4O3，分子量：446.90。易瑞沙的性状为褐色，圆形，薄膜衣片，一面印有“IRESSA250”。易瑞沙的贮藏条件为30℃以下保存，包装为PVC/铝箔泡罩包装，10片/盒或30片/盒。易瑞沙的有效期为36个月。易瑞沙的执行标准为进口药品注册标准JX20170169，批准文号为H20181042。易瑞沙的生产企业为Kagamiishi Plant, Nipro Pharma Corporation。特罗凯（盐酸厄洛替尼片）的化学名称为N-(3-乙炔苯基)-6,7-双(2-甲氧乙氧基)-4-喹唑啉胺盐酸盐，化学结构式为分子式：C22H23N3O4·HCl，分子量：429.90。特罗凯的规格为100mg或150mg。特罗凯的用法用量为每日150mg，至少在饭前1小时或饭后2小时服用。特罗凯的注意事项包括间质性肺病、肝功能衰竭或胃肠穿孔的患者应停止使用特罗凯，同时使用CYP3A4强抑制剂如阿扎那韦、克拉霉素、印地那韦、伊曲康唑、酮康唑、奈法唑酮、奈非那韦、利托那韦、沙奎那韦、泰利霉素、醋竹桃霉素（TAO）、伏立康唑等药物或者葡萄柚、葡萄柚汁时应考虑减量，否则可出现严重的不良反应。",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "易瑞沙",
                "options": {}
              }
            },
            {
              "dateTime": "2023/8/23 14:00:46",
              "text": "感冒灵",
              "inversion": true,
              "error": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "感冒灵",
                "options": null
              }
            },
            {
              "dateTime": "2023/8/23 14:00:55",
              "text": "感冒灵是一种中药,由多种草药配制而成。其主要成分包括三叉苦、金盏银盘、野菊花、对乙酰氨基酚、扑尔敏等。感冒灵主要用于治疗普通感冒、流感等病症。\n\n感冒灵具有解热镇痛、抗组织胺、抗炎等作用,可以缓解头痛、发热、鼻塞、流涕、咽痛等症状。感冒灵还可以促进鼻涕和痰液的排出,使感冒症状更快地缓解。\n\n感冒灵是一种非处方药,但使用时应按照说明书或医生的指导使用,避免超量或长期使用。如果有任何疑问或不适,应立即停止使用并咨询医生。",
              "inversion": false,
              "error": false,
              "loading": false,
              "conversationOptions": null,
              "requestOptions": {
                "prompt": "感冒灵",
                "options": {}
              }
            }
          ]
        }
      ],
      historyList: [{
          "title": "感冒灵1",
          "uuid": 1692770461252,
          "isEdit": false
        },
        {
          "uuid": 1692236763045,
          "title": "易瑞沙",
          "isEdit": false
        }
      ],
      selectedIndex: 0,
      currentChat: undefined
    }
  },
  created() {
    this.selectedIndex = 1
    this.currentChat = this.chatList[1]
  },
  methods: {
    switchChat(i) {
      this.selectedIndex = i
      this.currentChat = this.chatList[i]
    }
  }
}

</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  background-color: transparent;
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

html.dark ::-webkit-scrollbar {
  background-color: transparent;
  width: 5px;
}

html.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.aa {

  .overflow-hidden,
  .overflow {
    overflow: hidden;
  }

  .px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .overflow-y-auto {
    overflow-y: auto;
  }

  .text-ellipsis {
    text-overflow: ellipsis;
  }

  .whitespace-nowrap {
    white-space: nowrap;
  }

  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }

  .break-words {
    overflow-wrap: break-word;
  }

  .break-all {
    word-break: break-all;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .w-full {
    width: 100%;
  }

  .flex {
    display: flex;
  }

  .rounded-full {
    border-radius: 9999px;
  }

  .flex-row {
    flex-direction: row;
  }

  .flex-row-reverse {
    flex-direction: row-reverse;
  }

  .flex-col {
    flex-direction: column;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .items-start {
    align-items: flex-start;
  }

  .items-end {
    align-items: flex-end;
  }

  .items-center {
    align-items: center;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .gap-1 {
    gap: 0.25rem;
  }

  .gap-2 {
    gap: 0.5rem;
  }

  .gap-3 {
    gap: 0.75rem;
  }

  .gap-4 {
    gap: 1rem;
  }

  .mb-6 {
    margin-bottom: 1.5rem;
  }

  .w-full {
    width: 100%;
  }

  .h-full {
    height: 100%;
  }

  .flex-1 {
    flex: 1 1 0%;
  }

  .flex-shrink-0 {
    flex-shrink: 0;
  }
}

.wrap {
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background: linear-gradient(246.75deg, rgba(0, 64, 214, 1) 0%, rgba(2, 86, 233, 1) 100%);

  .main {
    left: 63px;
    top: 66px;
    width: calc(100% - 126px);
    height: calc(100% - 132px);
    opacity: 1;
    border-radius: 43px;
    background: #3075ff;
    position: absolute;
    display: flex;

    .left {
      flex-basis: 466px;
      padding-left: 76px;
      background-image: url(../assets/8.png);
      background-position: bottom;
      background-repeat: no-repeat;
      background-size: 50%;

      .top {
        overflow: hidden;
        margin-top: 59px;

        img {
          margin-right: 20px;
        }

        .com {
          font-size: 36px;
          font-weight: 500;
          letter-spacing: 0px;
          line-height: 50px;
          color: rgba(255, 255, 255, 1);
        }

        .project {
          font-size: 29px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 41.99px;
          color: rgba(255, 255, 255, 1);
        }
      }

      .add-chat {
        width: 327px;
        height: 60px;
        opacity: 1;
        border-radius: 35px;
        background: rgba(0, 186, 173, 1);
        margin-top: 63px;
        margin-bottom: 54px;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 34.75px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 60px;
        position: relative;
        cursor: pointer;

        &::after {
          content: '';
          background-image: url(../assets/7.png);
          display: inline-block;
          width: 31px;
          height: 31px;
          position: absolute;
          top: 16px;
          left: calc(50% - 90px);
        }
      }

      .item {
        width: 327px;
        height: 64px;
        line-height: 64px;
        opacity: 1;
        border-radius: 4px;
        background: rgba(58, 126, 251, 1);
        border: 1px solid rgba(242, 247, 255, 0.5);
        margin-top: 34px;
        cursor: pointer;

        &.selected {
          background: rgba(255, 255, 255, 1);
        }

        .icon {
          display: inline-block;
          width: 33px;
          height: 29px;
          background-image: url(../assets/2.png);
          margin: 15px 17px 0 21px;
        }

        .name {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0px;
          color: rgba(255, 255, 255, 1);
        }

        &.selected .name {
          color: rgba(58, 126, 251, 1);
        }

        .edit {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-image: url(../assets/5-1.png);
          margin-top: 22px;
          margin-right: 15px;
        }

        &.selected .edit {
          background-image: url(../assets/5.png);
        }

        .del {
          display: inline-block;
          width: 21px;
          height: 21px;
          background-image: url(../assets/6-1.png);
          margin-top: 22px;
          margin-right: 15px;
        }

        &.selected .del {
          background-image: url(../assets/6.png);
        }
      }
    }

    .right {
      background-image: url(../assets/right-bg.png);
      background-size: cover;
      flex: 1;
      border-radius: 43px;
      position: relative;
      overflow-x: hidden;

      main {

        .flex-row-reverse {

          .img-wrap {
            height: 45px;
            margin-left: 20px;

            img {
              width: 45px;
              height: 45px;
            }
          }

          .time {
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 17.38px;
            color: rgba(138, 138, 138, 1);
            text-align: right;
            margin-bottom: 10px;
            margin-top: 6px;
          }

          .text-wrap {
            border-radius: 14px 14px 0px 14px;
            background: rgba(58, 126, 251, 1);
            min-width: 20px;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 20.27px;
            color: rgba(255, 255, 255, 1);
          }
        }

        .jq {
          .img-wrap {
            height: 45px;
            margin-right: 20px;

            img {
              width: 45px;
              height: 45px;
            }
          }

          .time {
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 17.38px;
            color: rgba(138, 138, 138, 1);
            text-align: left;
            margin-bottom: 10px;
            margin-top: 6px;
          }

          .text-wrap {
            border-radius: 14px 0px 14px 14px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(214, 214, 214, 1);
            min-width: 20px;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 20.27px;
            color: rgba(56, 56, 56, 1);
          }
        }
      }

    }
  }
}

</style>
