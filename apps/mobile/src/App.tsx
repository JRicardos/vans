import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
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

const roleRoutes: Array<{ label: Role; path: string }> = [
  { label: 'passageiro', path: '/passageiro' },
  { label: 'motorista', path: '/motorista' },
  { label: 'admin', path: '/admin' },
]

function MapPreview() {
  return (
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
  )
}

function PassengerHome() {
  return (
    <>
      <MapPreview />

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
          <NavLink to="/rota">Ver mapa</NavLink>
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
    </>
  )
}

function DriverHome() {
  return (
    <section className="driver-panel route-page">
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
  )
}

function AdminHome() {
  return (
    <>
      <section className="admin-strip">
        {adminMetrics.map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="list-card">
        <div className="section-title">
          <div>
            <span className="card-kicker">Admin</span>
            <h2>Operacao de hoje</h2>
          </div>
        </div>
        <div className="stop-list">
          <div className="driver-stop">
            <div>
              <strong>Rota Escola Central</strong>
              <p>12 confirmados, 1 pendente</p>
            </div>
            <span>Saida 07:00</span>
          </div>
          <div className="driver-stop">
            <div>
              <strong>Van 02</strong>
              <p>Motorista Carlos, rastreamento inativo</p>
            </div>
            <span>Pronta</span>
          </div>
        </div>
      </section>
    </>
  )
}

function RoutePage() {
  return (
    <>
      <MapPreview />
      <section className="list-card">
        <div className="section-title">
          <div>
            <span className="card-kicker">Rota ao vivo</span>
            <h2>Chegada estimada</h2>
          </div>
        </div>
        <div className="stop-list">
          {passengerStops.map((stop, index) => (
            <div className="stop-row" key={stop.name}>
              <span className="stop-number">{index + 1}</span>
              <div>
                <strong>{stop.name}</strong>
                <p>{index === 0 ? 'Proxima parada' : stop.status}</p>
              </div>
              <time>{stop.eta}</time>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function PaymentsPage() {
  return (
    <section className="list-card route-page">
      <div className="section-title">
        <div>
          <span className="card-kicker">Pagamentos</span>
          <h2>Mensalidade ativa</h2>
        </div>
      </div>
      <div className="payment-summary">
        <strong>R$ 420,00</strong>
        <span>Plano mensal pre-pago</span>
      </div>
      <div className="driver-stop">
        <div>
          <strong>Proxima cobranca</strong>
          <p>06/06 via Pix ou boleto</p>
        </div>
        <span>Em dia</span>
      </div>
    </section>
  )
}

function ProfilePage() {
  return (
    <section className="list-card route-page">
      <div className="section-title">
        <div>
          <span className="card-kicker">Perfil</span>
          <h2>Marina Alves</h2>
        </div>
      </div>
      <div className="driver-stop">
        <div>
          <strong>Passageira</strong>
          <p>Rota Escola Central</p>
        </div>
        <span>Ativa</span>
      </div>
      <div className="driver-stop">
        <div>
          <strong>Responsavel</strong>
          <p>Paulo Alves</p>
        </div>
        <span>Contato</span>
      </div>
    </section>
  )
}

function App() {
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
          {roleRoutes.map((route) => (
            <NavLink className="role-button" key={route.label} to={route.path}>
              {route.label}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route index element={<Navigate replace to="/passageiro" />} />
          <Route path="/passageiro" element={<PassengerHome />} />
          <Route path="/motorista" element={<DriverHome />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/rota" element={<RoutePage />} />
          <Route path="/pagamentos" element={<PaymentsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="*" element={<Navigate replace to="/passageiro" />} />
        </Routes>

        <nav className="bottom-tabs" aria-label="Navegacao principal">
          <NavLink className="tab" to="/passageiro">
            <span>Hoje</span>
          </NavLink>
          <NavLink className="tab" to="/rota">
            <span>Rota</span>
          </NavLink>
          <NavLink className="tab" to="/pagamentos">
            <span>Pagar</span>
          </NavLink>
          <NavLink className="tab" to="/perfil">
            <span>Perfil</span>
          </NavLink>
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
