let contadorAcompanhantes = 0;
const telefoneWhatsApp = "5582988369610";
const chavePix = "a4094d9c-fa16-4ec4-bbab-24322b280c4a";

// Vitrine de Presentes com valores estimados de referência
const products = [
    {
        id: 1,
        title: "Cozinha Compacta Luna sem Tampo",
        category: "cozinha",
        imageUrl: "https://m.magazineluiza.com.br/a-static/420x420/cozinha-compacta-luna-sem-tampo-e-pia-kappesberg-3-pecas-canela-verde-oliva/grupok1sa/r780-cnve/2c391bb99aee78ef2668193da2d6e3d6.jpeg",
        estimatedValue: 1104,
        description: "Cozinha Compacta Luna sem Tampo e Pia Kappesberg 3 Peças Canela/Verde Oliva."
    },
    {
        id: 2,
        title: "Mesa 4 cadeiras Madesa",
        category: "cozinha",
        imageUrl: "https://m.magazineluiza.com.br/a-static/420x420/conjunto-sala-de-jantar-luana-mesa-4-cadeiras-madesa/lojawebcontinentalmarketplace/mkp000631001540/15d3977f5f32a0d832d6e360d4bf0526.jpeg",
        estimatedValue: 439,
        description: "Conjunto Sala de Jantar Luana Mesa 4 Cadeiras Madesa."
    },
    {
        id: 3,
        title: "Processador Oster",
        category: "cozinha",
        imageUrl: "https://m.media-amazon.com/images/I/614p2dVXYSL._AC_SY450_.jpg",
        estimatedValue: 198,
        description: "Oster OMPR670 Compacto 3 em 1 - Processador, 220V, 300W, Preto, 16 x 16 x 33 cm."
    },
    {
        id: 4,
        title: "Rack Para Sala",
        category: "sala",
        imageUrl: "https://http2.mlstatic.com/D_Q_NP_667278-MLA112069922603_052026-F.webp",
        estimatedValue: 549,
        description: "O Rack Flynt é ideal para TVs de até 75, combinando funcionalidade e estilo."
    },
    {
        id: 5,
        title: "Luminária de Chão",
        category: "sala",
        imageUrl: "https://m.media-amazon.com/images/I/61UDZxil4gL._AC_SX522_.jpg",
        estimatedValue: 120,
        description: "Luminária de piso para leitura, em metal preto ou dourado escuro, para compor o cantinho da nossa sala de estar."
    },
    {
        id: 6,
        title: "Smart TV 32 HD Philco P32CRB Roku TV HDR10 Dolby Audio",
        category: "eletro",
        imageUrl: "https://imgs.casasbahia.com.br/55071897/2xg.jpg?imwidth=500?imwidth=828",
        estimatedValue: 889,
        description: "Smart TV Philco de 32 polegadas com Roku TV, HDR10 e Dolby Audio, para os nossos momentos de descanso juntos."
    },
    {
        id:7,
        title: "Sofá Retrátil",
        category: "sala",
        imageUrl: "https://m.magazineluiza.com.br/a-static/420x420/sofa-retratil-reclinavel-3-lugares-suede-phormatta-evolution-smp/magazineluiza/121927508/987f3445d9028df111ea28c07dfa54a9.jpg",
        estimatedValue: 1195,
        description: "Madeira Pinus e Eucalipto 100% Reflorestada.",
    },
    {
        id:8,
        title: "Máquina de Lavar",
        category: "eletro",
        imageUrl: "https://m.magazineluiza.com.br/a-static/420x420/maquina-de-lavar-electrolux-11kg-branca-essential-care-com-easy-clean-e-filtro-fiapos-les11/electrolux/2004292/965433ed92fb6f8751db817886356e74.jpg",
        estimatedValue: 1519,
        description: "Máquina de Lavar Electrolux 11kg Branca Essential Care com Easy Clean e Filtro Fiapos",
    },

];

const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('gift-modal');
const closeModalBtn = document.querySelector('.close-modal');
const formatCurrency = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const categoryNames = { cozinha: 'Cozinha', sala: 'Sala', eletro: 'Eletro' };
let lastFocusedElement;
function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastFocusedElement?.focus({ preventScroll: true });
}

function displayProducts(filteredProducts) {
    if(!productsGrid) return;
    document.getElementById('product-count').textContent = `${filteredProducts.length} presentes`;
    productsGrid.innerHTML = filteredProducts.map((product, index) => `
        <article class="product-card" style="--delay: ${index * 45}ms">
            <button type="button" class="product-image" onclick="openModal(${product.id})" aria-label="Ver detalhes: ${product.title}"><img src="${product.imageUrl}" alt="${product.title}" loading="lazy" /></button>
            <div class="product-info">
                <span class="product-category">${categoryNames[product.category]}</span>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price"><span>Valor de referência</span>${formatCurrency(product.estimatedValue)}</p>
                <button class="view-btn" onclick="openModal(${product.id})" aria-label="Ver detalhes: ${product.title}">Ver detalhes <span aria-hidden="true">↗</span></button>
            </div>
        </article>
    `).join('');
}

displayProducts(products);
filterBtns.forEach(btn => btn.setAttribute('aria-pressed', String(btn.classList.contains('active'))));

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const category = btn.dataset.category;
        if (category === 'all') {
            displayProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            displayProducts(filtered);
        }
    });
});

let currentProductValue = 0;
function openModal(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('modal-title').innerText = product.title;
        document.getElementById('modal-category').innerText = `${categoryNames[product.category]} · ${formatCurrency(product.estimatedValue)}`;
        document.getElementById('modal-description').innerText = product.description;
        document.getElementById('modal-icon-container').innerHTML = `<img src="${product.imageUrl}" alt="${product.title}" style="width: 100%; max-height: 200px; object-fit: contain; display: block; margin: 0 auto 15px;" />`;
        currentProductValue = product.estimatedValue;
        lastFocusedElement = document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        closeModalBtn.focus();
    }
}

document.getElementById('modal-contribute-btn').addEventListener('click', () => {
    closeModal();
    document.getElementById('destinoPresente').value = 'lar';
    document.getElementById('valorLivre').value = currentProductValue;
    document.getElementById('pix-section').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    gerarPix(currentProductValue);
});

closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', event => {
    if (!modal.classList.contains('active')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'Tab') {
        const first = closeModalBtn;
        const last = document.getElementById('modal-contribute-btn');
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
});

function adicionarAcompanhante() {
  contadorAcompanhantes++;
  const div = document.createElement("div");
  div.className = "acompanhante";
  div.innerHTML = `
    <label>Acompanhante ${contadorAcompanhantes}</label>
    <input type="text" class="acompanhanteInput" placeholder="Nome do acompanhante" />
  `;
  document.getElementById("acompanhantes").appendChild(div);
}

function confirmarPresenca() {
  const nome = document.getElementById("nome").value.trim();
  if (!nome) {
    alert("Digite seu nome para confirmar presença.");
    return;
  }
  const acompanhantes = [...document.querySelectorAll(".acompanhanteInput")]
    .map(input => input.value.trim())
    .filter(nome => nome !== "");

  let mensagem = `Olá! Quero confirmar minha presença no casamento de Guilherme e Rita.%0A%0A`;
  mensagem += `Nome: ${nome}%0A`;

  if (acompanhantes.length > 0) {
    mensagem += `%0AAcompanhantes:%0A`;
    acompanhantes.forEach((pessoa, index) => {
      mensagem += `${index + 1}. ${pessoa}%0A`;
    });
  } else {
    mensagem += `%0ASem acompanhantes.`;
  }
  window.open(`https://wa.me/${telefoneWhatsApp}?text=${mensagem}`, "_blank");
}

function selecionarValor(valor) {
  document.getElementById('valorLivre').value = valor;
  gerarPix(valor);
}

function selecionarContribuicao(destino) {
  document.getElementById('destinoPresente').value = destino;
  document.getElementById('valorLivre').value = '';
  document.getElementById('pixArea').classList.add('hidden');
  document.querySelectorAll('.valores button').forEach(button => {
    button.classList.remove('selected');
    button.setAttribute('aria-pressed', 'false');
  });
  document.getElementById('pix-section').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.getElementById('valorLivre').focus({ preventScroll: true });
}

document.getElementById('destinoPresente').addEventListener('change', () => {
  if (!document.getElementById('pixArea').classList.contains('hidden')) {
    const valor = Number(document.getElementById('valorLivre').value);
    if (Number.isFinite(valor) && valor > 0) gerarPix(valor);
  }
});

function usarValorLivre() {
  const valor = Number(document.getElementById("valorLivre").value);
  if (!valor || valor <= 0) {
    alert("Digite um valor válido.");
    return;
  }
  gerarPix(valor);
}

function gerarPix(valor) {
  document.querySelectorAll('.valores button').forEach(button => {
    const selected = Number(button.textContent.replace(/[^0-9]/g, '')) === valor;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.getElementById('copy-status').textContent = '';
  const chave = chavePix;
  const nomeRecebedor = "GUILHERME E RITA";
  const cidade = "MACEIO";
  const descricoes = { lar: 'Presente casamento', 'lua-mel': 'Lua de mel', preparativos: 'Preparativos da festa', celebracao: 'Mimos da celebracao' };
  const descricao = descricoes[document.getElementById('destinoPresente').value] || descricoes.lar;

  const pix = gerarPayloadPix({ chave, nomeRecebedor, cidade, valor, descricao });

  document.getElementById("pixArea").classList.remove("hidden");
  document.getElementById("pixCopiaCola").value = pix;
  document.getElementById("qrcode").innerHTML = "";

  new QRCode(document.getElementById("qrcode"), {
    text: pix,
    width: 220,
    height: 220
  });
}

async function copiarPix() {
  const campo = document.getElementById("pixCopiaCola");
  campo.select();
  campo.setSelectionRange(0, 99999);
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(campo.value);
    else if (!document.execCommand("copy")) throw new Error('Copy failed');
    document.getElementById('copy-status').textContent = 'Código copiado! Agora é só colar no aplicativo do seu banco.';
  } catch {
    document.getElementById('copy-status').textContent = 'Selecione e copie o código acima para continuar.';
  }
}

function formatarCampo(id, valor) {
  const tamanho = String(valor.length).padStart(2, "0");
  return id + tamanho + valor;
}

function gerarPayloadPix({ chave, nomeRecebedor, cidade, valor, descricao }) {
  const gui = formatarCampo("00", "br.gov.bcb.pix") +
              formatarCampo("01", chave) +
              formatarCampo("02", descricao);

  const merchantAccount = formatarCampo("26", gui);

  const payloadSemCRC =
    formatarCampo("00", "01") +
    merchantAccount +
    formatarCampo("52", "0000") +
    formatarCampo("53", "986") +
    formatarCampo("54", valor.toFixed(2)) +
    formatarCampo("58", "BR") +
    formatarCampo("59", nomeRecebedor.substring(0, 25)) +
    formatarCampo("60", cidade.substring(0, 15)) +
    formatarCampo("62", formatarCampo("05", "***")) +
    "6304";

  return payloadSemCRC + crc16(payloadSemCRC);
}

function crc16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}
