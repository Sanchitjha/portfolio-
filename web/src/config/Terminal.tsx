export interface TerminalTool {
  name: string;
  description: string;
  href: string;
}

export interface TerminalSnippet {
  /** Shown as the tab/section label, usually the file name. */
  file: string;
  description: string;
  code: string;
}

export const terminalIntro = {
  heading: 'Terminal',
  description: 'Zsh, Starship, Fastfetch, and shell configuration.',
};

export const terminalTools: TerminalTool[] = [
  {
    name: 'Zsh',
    description: 'Shell, with zsh-autosuggestions and zsh-syntax-highlighting.',
    href: 'https://www.zsh.org/',
  },
  {
    name: 'Starship',
    description: 'Cross-shell prompt — fast, and configured in one TOML file.',
    href: 'https://starship.rs/',
  },
  {
    name: 'Fastfetch',
    description: 'System info on shell start, a faster neofetch.',
    href: 'https://github.com/fastfetch-cli/fastfetch',
  },
  {
    name: 'fzf',
    description: 'Fuzzy finder — history search and file jumping.',
    href: 'https://github.com/junegunn/fzf',
  },
  {
    name: 'zoxide',
    description: 'A smarter cd that learns the directories you use.',
    href: 'https://github.com/ajeetdsouza/zoxide',
  },
  {
    name: 'eza',
    description: 'Modern ls replacement with icons and git status.',
    href: 'https://github.com/eza-community/eza',
  },
];

export const terminalSnippets: TerminalSnippet[] = [
  {
    file: '~/.zshrc',
    description: 'Plugins, aliases, and shell integrations.',
    code: [
      '# plugins',
      'source $HOMEBREW_PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh',
      'source $HOMEBREW_PREFIX/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh',
      '',
      '# integrations',
      'eval "$(starship init zsh)"',
      'eval "$(zoxide init zsh)"',
      'source <(fzf --zsh)',
      '',
      '# aliases',
      'alias ls="eza --icons --group-directories-first"',
      'alias ll="eza -la --icons --git"',
      'alias gs="git status -sb"',
      'alias gp="git push"',
      'alias dev="npm run dev"',
      '',
      'fastfetch',
    ].join('\n'),
  },
  {
    file: '~/.config/starship.toml',
    description: 'Prompt layout — directory, git branch, and status.',
    code: [
      'add_newline = true',
      '',
      '[directory]',
      'truncation_length = 3',
      'style = "bold cyan"',
      '',
      '[git_branch]',
      'symbol = " "',
      'style = "bold purple"',
      '',
      '[git_status]',
      'style = "bold yellow"',
      '',
      '[nodejs]',
      'format = "via [$symbol($version )]($style)"',
    ].join('\n'),
  },
];
