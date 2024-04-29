document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('form-gasto');
    const listaGastos = document.getElementById('lista-gastos');
    const API_URL = 'http://localhost:3000/api/gastos';

    async function carregarGastos() {
        const response = await fetch(API_URL);
        const gastos = await response.json();
        listaGastos.innerHTML = '';
        gastos.forEach(gasto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${gasto.descricao}</td>
                <td>${formatarValorReal(gasto.valor)}</td>
                <td>
                    <button class="btn-editar" data-id="${gasto.id}">Editar</button>
                    <button class="btn-excluir" data-id="${gasto.id}">
                        <span class="mdi mdi-delete mdi-24px"></span>
                    </button>
                </td>
            `;
            listaGastos.appendChild(tr);
        });
    }
    

    function formatarValorReal(valor) {
        return "R$ " + (parseFloat(valor) || 0).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    }

    listaGastos.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-editar')) {
            const id = event.target.getAttribute('data-id');
            const descricao = prompt('Digite a nova descrição:');
            let valor = prompt('Digite o novo valor:');
            if (descricao && valor) {
                valor = removerFormatoReal(valor);
                await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ descricao, valor })
                });
                await carregarGastos();
            }
        } else if (event.target.classList.contains('btn-excluir')) {
            const id = event.target.getAttribute('data-id');
            if (confirm('Tem certeza que deseja excluir este gasto?')) {
                await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE'
                });
                await carregarGastos();
            }
        }
    });

    function removerFormatoReal(valor) {
        return parseFloat(valor.replace('R$ ', '').replace('.', '').replace(',', '.'));
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const descricao = document.getElementById('descricao').value;
        let valor = document.getElementById('valor').value;
        if (descricao && valor) {
            valor = removerFormatoReal(valor);
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ descricao, valor })
            });
            await carregarGastos();
            form.reset();
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    });

    await carregarGastos();
});
