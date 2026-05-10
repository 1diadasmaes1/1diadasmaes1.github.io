// =====================================================================
//  CONFIG — TUDO QUE VOCÊ PROVAVELMENTE QUER MUDAR ESTÁ AQUI
//  (mude valores; salve; recarregue a página)
// =====================================================================

export const CONFIG = {

  // ----- LOCAIS FÍSICOS (substitua os placeholders pelos lugares reais) -----
  LOCAL_ESPADA:  '[NOS TÊNIS SUJOS DO PABLITO]',   // ex: 'EMBAIXO DO SOFA DA SALA'
  LOCAL_GAVETA:  '[GAVETA DO ARMÁRIO DAS AGENDAS]',   // ex: 'GAVETA INFERIOR DA COMODA'

  // ----- IDS DOS ARTEFATOS FÍSICOS (caca-1 e caca-2) -----
  // PALAVRAS que ela tem que digitar (após decodar o papel físico no /tools).
  // Papel físico de caca-1: HEX de 'ESFORÇO'  → ela decoda → digita
  // Papel físico de caca-2: MORSE de 'AMOR'   → ela decoda → digita
  ID_ARTEFATO_A: 'ESFORÇO',     // sacada da academia (papel = HEX)
  ID_ARTEFATO_B: 'AMOR',        // álbum bebê        (papel = MORSE)


  // ----- CONTEÚDO DOS DECODES -----
  // O que cada codificação deve revelar quando ela acertar:

  // fragmento-1: 3 pedaços (colados pelo quarto após o duelo)
  // Frase final: "VA ATE A CAMA DO MEU FILHO"
  FRAGMENT_MORSE: 'VA ATE',
  FRAGMENT_B64:   'A CAMA DO',
  FRAGMENT_HEX:   'MEU FILHO',
  FRAGMENT_FULL:  'VA ATE A CAMA DO MEU FILHO',

  // fragmento-2: bilhete na cama do Billy Jr (papel = BASE64 de 'DEDICAÇÃO')
  // Aponta pra próxima fase: a sacada da academia (onde ela se DEDICA)
  BILLY_JR_REVEAL: 'DEDICAÇÃO',

  // caca-2: depois de validar ID_ARTEFATO_B, site combina e revela @super.gui
  TIKTOK_HANDLE: '@super.gui',

  // fragmento-3 etapa A: hex no caption do vídeo do TikTok decodifica pra esta palavra
  TIKTOK_HEX_WORD: 'AGENDAS',

  // fragmento-3 etapa B: papel no condomínio (BINÁRIO) decodifica pra esta palavra
  CONDOMINIO_WORD: 'RESILIÊNCIA',

  // setor-7: hex do crachá colado nela decodifica pra chave-mestre
  CRACHA_HEX_WORD: 'PODEROSA',


  // ----- TIMERS (em segundos) -----
  DUELO_MIN_SECONDS:    30,         // tempo mínimo antes do botão MONSTRO ABATIDO aparecer
  CACA_1_TIMER:         3 * 60,     // 3 min — sacada da academia
  CACA_2_TIMER:         5 * 60,     // 5 min — biblioteca/álbum
  CONDOMINIO_TIMER:     7 * 60,     // 7 min — corrida no condomínio


  // ----- LOGIN (caso queira adicionar tela de login) -----
  // Atualmente não há tela de login (index.html é o REBOOT).
  // Mantém aqui caso queira adicionar depois.
  LOGIN_USER:    '001',
  LOGIN_PASS:    'BILLY',
};
