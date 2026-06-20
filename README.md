# Tryout Dotenvx

A simple project to demonstrate using `dotenvx` in Node.js. The
`dotenvx` package allows you to load environment variables from a `.env` file
into `process.env` just like `dotenv`, but also encrypts and decrypts them, so
that you can commit them to the repo.

## Install <https://www.npmjs.com/package/@dotenvx/dotenvx>

```bash
npm install @dotenvx/dotenvx --save
# added 60 packages in 2s
```

- 5,966,913 bytes (9.9 MB on disk) for 1,596 items

## Create a .env file in the project root

```bash
cat > .env <<EOL
HELLO="Dotenvx"
OPENAI_API_KEY="your-api-key-goes-here"
EOL
cat .env
# HELLO="Dotenvx"
# OPENAI_API_KEY="your-api-key-goes-here"
```

## Encrypt the .env file

```bash
# Note that no .env.keys file currently exists.
file .env.keys
# .env.keys: cannot open `.env.keys' (No such file or directory)

# Run the encrypt command to create a .env.keys and encrypt the .env file.
npx dotenvx encrypt
# ◈ encrypted (.env)

# The .env file has been encrypted in-place. You can still see the key names.
cat .env
# #/-------------------[DOTENV_PUBLIC_KEY]--------------------/
# #/            public-key encryption for .env files          /
# #/       [how it works](https://dotenvx.com/encryption)     /
# #/----------------------------------------------------------/
# DOTENV_PUBLIC_KEY="021bdfe0 ... 72c8"
# 
# # .env
# HELLO="encrypted:BJ9XLjQBT+SC37xz ... jGBJuZE="
# OPENAI_API_KEY="encrypted:BM+B/hlF3VChITlq ... NWQs868="

# And the .env.keys file has been created.
cat .env.keys
# #/------------------!DOTENV_PRIVATE_KEYS!-------------------/
# #/ private decryption keys. DO NOT commit to source control /
# #/     [how it works](https://dotenvx.com/encryption)       /
# #/          ⛨ ARMORED KEYS: `dotenvx armor up`              /
# #/----------------------------------------------------------/
# 
# # .env
# DOTENV_PRIVATE_KEY=69e32e14 ... b1ef
```

## Secure your repo

Make sure to add `.env.keys` to your `.gitignore` file to prevent it from being
committed to version control.

> [!WARNING]
> **The .env encrypted file _should_ be committed to version control, but the .env.keys file _must not_ be.**

```bash
# Append ".env.keys" to .gitignore (and create .gitignore if it doesn't exist).
echo ".env.keys" >> .gitignore
cat .gitignore
# .env.keys
```

> [!NOTE]
> This repo intentionally includes a `.env.keys` file for demonstration purposes.

## Try it out

```bash
node index.js
# ⟐ injected env (3) from .env · dotenvx@1.75.0
# Hello Dotenvx
```

## View or output the PLAINTEXT .env file

```bash
# Decrypt to the console without decrypting the file.
npx dotenvx decrypt --stdout
# #/-------------------[DOTENV_PUBLIC_KEY]--------------------/
# #/            public-key encryption for .env files          /
# #/       [how it works](https://dotenvx.com/encryption)     /
# #/----------------------------------------------------------/
# DOTENV_PUBLIC_KEY="023c9c1290010b74c82f5041f306da9c6f46ffe8720b65bc0417c811baffb17ff6"
# 
# # .env
# HELLO="Dotenvx"
# OPENAI_API_KEY="your-api-key-goes-here"

# Or decrypt the .env file in-place.
npx dotenvx decrypt && cat .env
# ◇ decrypted (.env)
# #/-------------------[DOTENV_PUBLIC_KEY]--------------------/
# #/            public-key encryption for .env files          /
# #/       [how it works](https://dotenvx.com/encryption)     /
# #/----------------------------------------------------------/
# DOTENV_PUBLIC_KEY="023c9c1290010b74c82f5041f306da9c6f46ffe8720b65bc0417c811baffb17ff6"
# 
# # .env
# HELLO="Dotenvx"
# OPENAI_API_KEY="your-api-key-goes-here"

# Note that `require('@dotenvx/dotenvx').config()` also works on unencrypted .env files.
node index.js
# ⟐ injected env (3) from .env · dotenvx@1.75.0
# Hello Dotenvx
```

## Query and edit the encrypted .env file in-place

```bash
# Encrypt the .env file again to restore it to the encrypted state.
# Note that this does not change the .env.keys file - the same key is used.
npx dotenvx encrypt
# ◈ encrypted (.env)

# Decrypt a single env variable to the console.
npx dotenvx get HELLO
# Dotenvx

# Edit an encrypted env variable.
npx dotenvx set HELLO "Edited Dotenvx" && node index.js
# ◈ encrypted HELLO (.env)
# ⟐ injected env (3) from .env · dotenvx@1.75.0
# Hello Edited Dotenvx

# Add a new encrypted env variable.
npx dotenvx set NEW_VAR Another && npx dotenvx get NEW_VAR
# ◈ encrypted NEW_VAR (.env)
# Another
```

> [!TIP]
> The `dotenvx` CLI does not support deleting env variables in-place, but you
> can manually delete a variable, even in the encrypted .env file.

## Best practice

### Separate your keys

Use different private keys for development, staging, and production. Never share
the production private key with the entire development team.

### Key Rotation

If a colleague leaves the company or transitions off the project, rotate the
private key. Note that .env.keys retains old private keys, so legacy .env files
can still be decrypted if needed.

```bash
npx dotenvx rotate
# ⟳ rotated (.env)
```

### Avoid Chat Apps

Never send `DOTENV_PRIVATE_KEY` over standard Discord, Slack, or Microsoft Teams
channels, as these platforms retain data logs indefinitely.

## Install the code agent skill package

Follow the prompts to install the dotenv and/or dotenvx skill packages.

```bash
npx skills add motdotla/dotenv
```

You should see two new files added to your project:

- .agents/skills/dotenv/SKILL.md
- .agents/skills/dotenvx/SKILL.md

For the full Terminal output, see
[docs/add-dotenv-skills.md](docs/add-dotenv-skills.md).

