## Source code of bambot.org

Current project repository: https://github.com/liwlin/bambot

## 二次开发更新

本网站版本增加了 SCS225/SCSCL 舵机兼容：

- `/feetech.js` 舵机调试页支持 `Auto / STS / SCS225` 舵机类型选择。
- Playground 控制面板支持相同的舵机类型选择，并在连接后显示检测到的 profile、位置范围和可用舵机 ID。
- SCS225 位置范围显示和写入按 `0-1023` 处理。
- 未安装或无响应的舵机 ID 会显示为 `N/A` 并从后续控制命令中跳过。

Local verification used for this fork:

```bash
pnpm exec tsc --noEmit --pretty false
pnpm build
```
