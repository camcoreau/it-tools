<picture>
  <source srcset="./.github/logo-dark.png" media="(prefers-color-scheme: light)">
  <source srcset="./.github/logo-white.png" media="(prefers-color-scheme: dark)">
  <img src="./.github/logo-dark.png" alt="CamCore Tools">
</picture>

<h1 align="center">CamCore Tools</h1>

<p align="center">
  A secure collection of practical utilities for CamCore administration, development, troubleshooting and everyday IT work.
</p>

<p align="center">
  <a href="https://tools.inside.camcore.au"><strong>Open CamCore Tools</strong></a>
  ·
  <a href="https://inside.camcore.au">Inside CamCore</a>
  ·
  <a href="https://status.camcore.au">Service Status</a>
</p>

---

## About CamCore Tools

CamCore Tools provides a central collection of browser-based utilities for administrators and trusted CamCore users.

The available tools can assist with tasks such as:

* Network and IP address calculations
* Encoding and decoding
* Data conversion and formatting
* Cryptography and security checks
* Text processing
* Development and debugging
* Date and time calculations
* Web and system administration

Most tools operate directly in the browser. Information entered into a tool is not intentionally uploaded or retained by CamCore unless the selected function specifically requires an external service.

> **Access:** This service is intended for trusted devices connected to the CamCore network or through NetBird.

## CamCore Deployment

The CamCore deployment is operated as a self-hosted container and is managed as part of the CamCore private services environment.

### Docker Compose

```yaml
services:
  camcore-tools:
    image: corentinth/it-tools:latest
    container_name: camcore-tools
    restart: unless-stopped
    ports:
      - "8080:80"
```

Start the service with:

```sh
docker compose up -d
```

Update the container with:

```sh
docker compose pull
docker compose up -d
```

View its current status with:

```sh
docker compose ps
```

View recent logs with:

```sh
docker compose logs --tail=100 camcore-tools
```

## Source Project

CamCore Tools is based on the open-source **IT-Tools** project created by Corentin Thomasset.

Upstream project:

* [IT-Tools website](https://it-tools.tech)
* [Source repository](https://github.com/CorentinTh/it-tools)
* [Issues and feature requests](https://github.com/CorentinTh/it-tools/issues)

Upstream functionality, bug reports and proposed tools should be reviewed through the original project repository.

## Development

### Recommended IDE

[Visual Studio Code](https://code.visualstudio.com/) with:

* [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
* [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally)

Recommended workspace settings:

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "i18n-ally.localesPaths": [
    "locales",
    "src/tools/*/locales"
  ],
  "i18n-ally.keystyle": "nested"
}
```

### Project Setup

Install dependencies:

```sh
pnpm install
```

Start the development server:

```sh
pnpm dev
```

Type-check and build for production:

```sh
pnpm build
```

Run unit tests:

```sh
pnpm test
```

Run ESLint:

```sh
pnpm lint
```

### Creating a Tool

Generate the boilerplate for a new tool with:

```sh
pnpm run script:create:tool my-tool-name
```

The script creates the required files under `src/tools` and adds the relevant import to `src/tools/index.ts`.

The new tool must then be placed into the appropriate category and developed according to the upstream project structure.

## CamCore Service Information

| Property        | Value                                          |
| --------------- | ---------------------------------------------- |
| Service name    | CamCore Tools                                  |
| Environment     | Internal / Private                             |
| Access          | CamCore LAN or NetBird                         |
| Service type    | Browser-based IT utilities                     |
| Container image | `corentinth/it-tools:latest`                   |
| Restart policy  | `unless-stopped`                               |
| Service status  | [status.camcore.au](https://status.camcore.au) |
| Support         | [help@camcore.au](mailto:help@camcore.au)      |

## Privacy and Security

CamCore Tools is provided as an internal convenience service.

Users should not enter passwords, private keys, authentication tokens, recovery codes or other highly sensitive information unless they understand how the selected tool processes that information.

Access to the service does not replace standard CamCore security requirements.

## Maintenance

CamCore may update, restart or temporarily disable this service as part of routine maintenance, security remediation or infrastructure changes.

Planned maintenance and service interruptions may be published through the [CamCore Status page](https://status.camcore.au).

## Credits

The underlying IT-Tools project was created by [Corentin Thomasset](https://corentin.tech) with contributions from the open-source community.

CamCore branding, deployment configuration and operational documentation are maintained for the **CamCore – Cameron Family Secure Network** environment.

CamCore does not claim ownership of the original IT-Tools project or its upstream source code.

## Licence

The underlying project is licensed under the [GNU General Public License version 3](LICENSE).

Any redistribution or modification must continue to comply with the terms of the GNU GPLv3.
