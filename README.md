<a href="https://bambot.org">
  <img width="1130" alt="Screenshot of bambot.org" src="https://github.com/user-attachments/assets/bcf347d7-5d76-4021-8a99-bb4515323fe0" />
</a>

<br/>
<br/>
<br/>

<p align="center">
  <a href="https://discord.gg/Fq2gvSMyRJ"><img src="https://flat.badgen.net/static/chat/on%20discord" alt="Discord"></a>
  <a href="https://i.v2ex.co/1U6OSqswl.jpeg"><img src="https://flat.badgen.net/static/chat/on%20wechat?color=green" alt="WeChat"></a>
  <a href="https://x.com/tim_qian"><img src="https://flat.badgen.net/static/follow/on%20X?color=black" alt="X"></a>
  <a href="https://deepwiki.com/liwlin/bambot"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
</p>

# [Bambot](https://bambot.org)

Current project repository: https://github.com/liwlin/bambot

## 二次开发更新

2026-07-04 本项目在原 Bambot/feetech.js 基础上增加了 SCS225 舵机兼容：

- `feetech.js` 新增 STS/SMS 与 SCS/SCSCL/SCS225 舵机 profile，SCS225 位置范围按 `0-1023` 处理，STS/SMS 保持 `0-4095`。
- 前端舵机调试页和 Playground 控制面板新增 `Auto / STS / SCS225` 类型选择，支持自动检测，也可以手动指定 SCS225。
- Playground 连接真实机械臂时会跳过未安装或无响应的舵机，例如 6 号舵机缺席时显示为 `N/A`，不再阻塞其他舵机控制。
- SDK 写入逻辑按 SCSCL 控制表适配位置模式、轮模式、PWM/速度写入和同步写入；不支持的 STS 专有功能在 SCS225 下会明确禁用。
- 已补充 SCS225 smoke 测试脚本：`cd feetech.js && npm test`。

Play with open-source, low-cost AI robots 🤖



## Demo Video

<a href="https://x.com/Tim_Qian/status/1901952877243122014"> <img alt="Bambot, open source, low-cost humanoid \($300\)" src="https://github.com/user-attachments/assets/bc9536e2-1fa6-4cb5-99f3-15a794bf09cf" width="600" style="height:auto;" ></a>
