# BEATEMPO - Agência Publicitária Musical

## 🚀 Sistema de URLs Amigáveis

O site agora suporta URLs amigáveis em português sem acentos:

### URLs Disponíveis:
- **Home:** `https://beatempo.com.br/`
- **Serviços:** `https://beatempo.com.br/servicos`
- **Produções:** `https://beatempo.com.br/producoes`
- **Sobre:** `https://beatempo.com.br/sobre`
- **Orçamento:** `https://beatempo.com.br/orcamento`

## 🛠️ Como Executar

### Opção 1: Servidor de Desenvolvimento (Recomendado)
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
# ou
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Opção 2: Servidor Apache (Produção)
Certifique-se de que o arquivo `.htaccess` está na raiz do projeto.

## 📁 Arquivos Modificados

### 1. `index.html`
- Links de navegação alterados para URLs amigáveis
- Todos os botões "SOLICITAR ORÇAMENTO" agora apontam para `/orcamento`

### 2. `script.js`
- Sistema de roteamento JavaScript adicionado
- Navegação suave entre seções
- Suporte a botões voltar/avançar do navegador

### 3. `.htaccess`
- Configuração do Apache para URLs amigáveis
- Otimizações de cache e compressão

### 4. `server.js`
- Servidor Node.js para desenvolvimento
- Suporte completo às URLs amigáveis

## 🔧 Funcionalidades

✅ **Navegação Suave:** Scroll automático para as seções corretas  
✅ **URLs Amigáveis:** URLs em português sem acentos  
✅ **Histórico do Navegador:** Botões voltar/avançar funcionam  
✅ **Links Externos:** WhatsApp, Spotify, YouTube não são afetados  
✅ **Performance:** Cache e compressão otimizados  

## 🐛 Solução de Problemas

### Erro "Cannot GET /servicos"
**Causa:** Servidor não configurado para URLs amigáveis  
**Solução:** Use o servidor de desenvolvimento (`npm start`) ou configure o Apache com o `.htaccess`

### Links não funcionam
**Causa:** JavaScript não carregado  
**Solução:** Verifique se o `script.js` está sendo carregado corretamente

### Scroll não suave
**Causa:** Seções não encontradas  
**Solução:** Verifique se os IDs das seções estão corretos (`home`, `services`, `productions`, `about`, `contact`)

## 📞 Suporte

Para dúvidas ou problemas, entre em contato através do WhatsApp: (41) 23910-713 