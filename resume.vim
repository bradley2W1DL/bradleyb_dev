let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/workspace/bradleyb_dev
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +5 src/layouts/Layout.astro
badd +20 src/pages/index.astro
badd +4 src/pages/resume.astro
badd +36 src/styles/resume.scss
badd +38 src/styles/home.scss
argglobal
%argdel
edit src/pages/resume.astro
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 99 + 99) / 198)
exe 'vert 2resize ' . ((&columns * 98 + 99) / 198)
argglobal
balt src/pages/index.astro
setlocal foldmethod=expr
setlocal foldexpr=nvim_treesitter#foldexpr()
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
7
normal! zo
8
normal! zo
9
normal! zo
19
normal! zo
20
normal! zo
32
normal! zo
34
normal! zo
35
normal! zo
42
normal! zo
58
normal! zo
60
normal! zo
61
normal! zo
63
normal! zo
84
normal! zo
86
normal! zo
106
normal! zo
let s:l = 20 - ((19 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 20
normal! 023|
wincmd w
argglobal
if bufexists(fnamemodify("src/styles/resume.scss", ":p")) | buffer src/styles/resume.scss | else | edit src/styles/resume.scss | endif
if &buftype ==# 'terminal'
  silent file src/styles/resume.scss
endif
balt src/pages/resume.astro
setlocal foldmethod=expr
setlocal foldexpr=nvim_treesitter#foldexpr()
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=99
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
7
normal! zo
8
normal! zo
28
normal! zo
31
normal! zo
let s:l = 36 - ((35 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 36
normal! 0
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 99 + 99) / 198)
exe 'vert 2resize ' . ((&columns * 98 + 99) / 198)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
