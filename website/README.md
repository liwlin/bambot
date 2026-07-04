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

## GitHub Pages deployment

The public website is deployed from the `gh-pages` branch as a static Next.js export.

For the `liwlin/bambot` project page, build with:

```bash
NEXT_STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/bambot pnpm build
```

The generated site lives in `website/out` and is published to:

https://liwlin.github.io/bambot/
