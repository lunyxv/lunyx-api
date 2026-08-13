// src/js/content.js – all text content, sections, docs, purchase, TOS
export const CONTENT = {
  home: {
    title: 'Lunyx',
    subtitle: 'Lua Obfuscator',
    features: [
      { icon: 'fa-solid fa-code', title: 'Advanced AST obfuscation', desc: 'Control flow, string encryption, and more.' },
      { icon: 'fa-solid fa-shield-halved', title: 'Anti-debug & integrity', desc: 'Protect your scripts from tampering.' },
      { icon: 'fa-solid fa-gauge-high', title: 'Blazing fast', desc: 'Minimal overhead, maximum protection.' },
      { icon: 'fa-solid fa-terminal', title: 'CLI & API ready', desc: 'Integrate into your workflow seamlessly.' },
    ]
  },
  docs: {
    title: 'Documentation',
    commands: [
      { cmd: 'lunyx obfuscate <file>', desc: 'Obfuscate a Lua file with default settings.' },
      { cmd: 'lunyx --string-encrypt', desc: 'Enable string encryption (--string-encrypt true/false).' },
      { cmd: 'lunyx --control-flow', desc: 'Control flow flattening (--control-flow true/false).' },
      { cmd: 'lunyx --output <path>', desc: 'Specify output file path.' },
      { cmd: 'lunyx --verbose', desc: 'Print detailed logs during obfuscation.' },
    ],
    note: 'For full API reference, visit our GitHub repository.'
  },
  purchase: {
    title: 'Purchase',
    plans: [
      { name: 'Starter', price: '$9', period: 'one-time', features: ['Basic obfuscation', 'String encryption', '1 concurrent job'] },
      { name: 'Pro', price: '$29', period: 'one-time', features: ['All advanced passes', 'Control flow', 'Anti-debug', '5 concurrent jobs'] },
      { name: 'Team', price: '$79', period: 'one-time', features: ['Unlimited jobs', 'Priority support', 'API access', 'Team license'] },
    ]
  },
  tos: {
    title: 'Terms of Service',
    sections: [
      { heading: 'Acceptance of Terms', text: 'By using Lunyx, you agree to comply with these terms. If you do not agree, do not use the service.' },
      { heading: 'License & Usage', text: 'You are granted a non-exclusive, non-transferable license to use the obfuscator for legitimate purposes. Resale or redistribution of the software is prohibited.' },
      { heading: 'Obfuscated Code', text: 'You retain ownership of your original code. Lunyx is not responsible for any misuse or damage caused by obfuscated scripts.' },
      { heading: 'Disclaimer', text: 'The service is provided "as is". We disclaim all warranties, express or implied, including fitness for a particular purpose.' },
      { heading: 'Contact', text: 'For any questions, reach out via Discord or GitHub.' },
    ]
  }
};

// helper: social links
export const SOCIAL = {
  discord: 'https://discord.gg/vKtwdAsDTP',
  github: 'https://github.com/lunyxv'
};
