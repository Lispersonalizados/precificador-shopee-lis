
import React, { useState } from "https://esm.sh/react";

export default function App() {
  const [custo, setCusto] = useState(1.62);
  const [lucro, setLucro] = useState(100);
  const [taxaShopee, setTaxaShopee] = useState(22);
  const [taxaFixa, setTaxaFixa] = useState(4);
  const [kits] = useState([10, 20, 30, 40, 50]);
  const [descontos] = useState([0, 10, 20, 30, 40, 50]);
  const [resultados, setResultados] = useState([]);

  const calcular = () => {
    const novosResultados = [];

    for (let qtd of kits) {
      const custoTotal = custo * (qtd / 10);
      const precoBase = (custoTotal + taxaFixa) / (1 - taxaShopee / 100);
      const precoFinal = precoBase * (1 + lucro / 100);

      for (let desc of descontos) {
        const precoComDesconto = precoFinal * (1 - desc / 100);
        const receitaLiquida = (precoComDesconto - taxaFixa) * (1 - taxaShopee / 100);
        const lucroReal = receitaLiquida - custoTotal;
        const margem = (lucroReal / custoTotal) * 100;

        novosResultados.push({
          qtd,
          desconto: desc,
          preco: precoComDesconto.toFixed(2),
          lucro: lucroReal.toFixed(2),
          margem: margem.toFixed(2),
          margemOk: margem >= 30 ? "Sim" : "Não",
        });
      }
    }
    setResultados(novosResultados);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Precificador da Shopee_Lis</h1>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <label>
          Custo (kit 10): <input type="number" value={custo} onChange={(e) => setCusto(+e.target.value)} />
        </label>
        <label>
          Lucro desejado (%): <input type="number" value={lucro} onChange={(e) => setLucro(+e.target.value)} />
        </label>
        <label>
          Taxa Shopee (%): <input type="number" value={taxaShopee} onChange={(e) => setTaxaShopee(+e.target.value)} />
        </label>
        <label>
          Taxa fixa (R$): <input type="number" value={taxaFixa} onChange={(e) => setTaxaFixa(+e.target.value)} />
        </label>
        <button onClick={calcular}>Calcular</button>
      </div>

      {resultados.length > 0 && (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Kit</th>
              <th>Desconto</th>
              <th>Preço</th>
              <th>Lucro</th>
              <th>Margem (%)</th>
              <th>Margem OK?</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((r, i) => (
              <tr key={i}>
                <td>{r.qtd}</td>
                <td>{r.desconto}%</td>
                <td>R$ {r.preco}</td>
                <td>R$ {r.lucro}</td>
                <td>{r.margem}%</td>
                <td>{r.margemOk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
