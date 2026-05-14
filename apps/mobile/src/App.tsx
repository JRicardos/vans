import './App.css'

const passengerStops = [
  { name: 'Lara Mendes', eta: '07:12', status: 'Confirmado' },
  { name: 'Rafael Costa', eta: '07:18', status: 'Confirmado' },
  { name: 'Ana Beatriz', eta: '07:24', status: 'Pendente' },
]

const driverStops = [
  { name: 'Lara Mendes', address: 'Rua das Flores, 120', state: 'Proxima' },
  { name: 'Rafael Costa', address: 'Av. Brasil, 815', state: 'A caminho' },
  { name: 'Ana Beatriz', address: 'Rua Alegre, 44', state: 'Aguardar' },
]

const adminMetrics = [
  { label: 'Vans ativas', value: '4' },
  { label: 'Confirmados', value: '38' },
  { label: 'Receita mes', value: 'R$ 18,4k' },
]

type Role = 'passageiro' | 'motorista' | 'admin'

function App() {
  const activeRole: Role = 'passageiro'

  return (
    <main className="app-shell">
      <section className="phone-preview" aria-label="Previa do aplicativo VanRotas">
        <div className="status-bar">
          <span>9:41</span>
          <span>5G 100%</span>
        </div>

        <header className="hero-card">
          <div>
            <p className="eyebrow">VanRotas</p>
            <h1>Bom dia, Marina</h1>
            <p className="hero-copy">Sua van chega em aproximadamente 12 minutos.</p>
          </div>
          <div className="live-pill">
            <span className="pulse-dot" />
            Ao vivo
          </div>
        </header>

        <nav className="role-switcher" aria-label="Selecionar perfil">
          {(['passageiro', 'motorista', 'admin'] as Role[]).map((role) => (
            <button
              className={role === activeRole ? 'role-button active' : 'role-button'}
              key={role}
              type="button"
            >
              {role}
            </button>
          ))}
        </nav>

        <section className="map-card" aria-label="Mapa da corrida">
          <div className="map-grid" />
          <div className="route-line" />
          <span className="van-marker">V</span>
          <span className="stop-marker first" />
          <span className="stop-marker second" />
          <div className="eta-card">
            <strong>2 paradas</strong>
            <span>antes do seu embarque</span>
          </div>
        </section>

        <section className="action-card primary-action">
          <div>
            <span className="card-kicker">Confirmacao de amanha</span>
            <h2>Voce vai embarcar?</h2>
          </div>
          <div className="button-row">
            <button className="ios-button secondary" type="button">
              Nao vou
            </button>
            <button className="ios-button primary" type="button">
              Vou
            </button>
          </div>
        </section>

        <section className="content-grid">
          <article className="mini-card">
            <span className="card-kicker">Pagamento</span>
            <strong>Mensalidade em dia</strong>
            <p>Proxima cobranca em 06/06</p>
          </article>
          <article className="mini-card">
            <span className="card-kicker">Rota</span>
            <strong>Escola Central</strong>
            <p>Corte de presenca as 22h</p>
          </article>
        </section>

        <section className="list-card">
          <div className="section-title">
            <div>
              <span className="card-kicker">Passageiro</span>
              <h2>Sequencia da van</h2>
            </div>
            <a href="#top">Ver mapa</a>
          </div>
          <div className="stop-list">
            {passengerStops.map((stop, index) => (
              <div className="stop-row" key={stop.name}>
                <span className="stop-number">{index + 1}</span>
                <div>
                  <strong>{stop.name}</strong>
                  <p>{stop.status}</p>
                </div>
                <time>{stop.eta}</time>
              </div>
            ))}
          </div>
        </section>

        <section className="driver-panel">
          <div className="section-title">
            <div>
              <span className="card-kicker">Motorista</span>
              <h2>Lista do dia</h2>
            </div>
            <button className="small-button" type="button">
              Iniciar
            </button>
          </div>
          {driverStops.map((stop) => (
            <div className="driver-stop" key={stop.name}>
              <div>
                <strong>{stop.name}</strong>
                <p>{stop.address}</p>
              </div>
              <span>{stop.state}</span>
            </div>
          ))}
        </section>

        <section className="admin-strip">
          {adminMetrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <nav className="bottom-tabs" aria-label="Navegacao principal">
          <button className="tab active" type="button">
            <span>Hoje</span>
          </button>
          <button className="tab" type="button">
            <span>Rota</span>
          </button>
          <button className="tab" type="button">
            <span>Pagar</span>
          </button>
          <button className="tab" type="button">
            <span>Perfil</span>
          </button>
        </nav>
      </section>

      <aside className="product-notes">
        <p className="eyebrow">Frontend mobile-first</p>
        <h2>Interface simples, acolhedora e inspirada em iOS.</h2>
        <p>
          A primeira tela prioriza o que cada usuario precisa decidir rapido:
          confirmar presenca, acompanhar a van, iniciar corrida ou ver a operacao
          do dia.
        </p>

        <div className="note-list">
          <div>
            <strong>Passageiro</strong>
            <span>CTA claro para presenca, pagamento e rastreamento ao vivo.</span>
          </div>
          <div>
            <strong>Motorista</strong>
            <span>Lista enxuta, proxima parada em destaque e acao de iniciar corrida.</span>
          </div>
          <div>
            <strong>Admin</strong>
            <span>Indicadores rapidos sem poluir a experiencia mobile.</span>
          </div>
        </div>
      </aside>
    </main>
  )
}

export default App
