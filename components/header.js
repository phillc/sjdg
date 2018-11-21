import Link from 'next/link'

export default ({isFull, sections}) => {
  let heightClass = isFull ? "is-fullheight" : "is-small"
  let heroClass = `hero is-success ${heightClass} is-bold`
  let sectionHeaders = Object.entries(sections || {}).map(([ref, title]) => {
    let href = `#${ref}`;
    return <li key={ref}>
        <a href={href}>
          {title}
        </a>
      </li>
  })
  return (<section className={heroClass}>
    <div className="hero-head">
      <header className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <a className="navbar-item">
                <img src="/static/images/sjdg-logo-small-flipped.png" alt="Logo" />
                <h1>South Jersey Disc Golf</h1>
              </a>
            </Link>
            <span className="navbar-burger burger" data-target="navbarMenuHeroC">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroC" className="navbar-menu is-active">
            <div className="navbar-end">
              <Link href="/">
                <a className="navbar-item is-active">
                  Home
                </a>
              </Link>
              <Link href="/about">
                <a className="navbar-item">
                  About
                </a>
              </Link>
              <Link href="/courses">
                <a className="navbar-item">
                  Courses
                </a>
              </Link>
              <Link href="/events">
                <a className="navbar-item">
                  Events
                </a>
              </Link>
              <Link href="/contact">
                <a className="navbar-item">
                  Contact
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>

    <div className="hero-body">
      <div className="container">
        <div className="columns">
          <div className="column is-half has-text-right">
            <h1 className="title">
              SJDG
            </h1>
            <h2 className="subtitle">
              Some catch phrase
            </h2>
          </div>
          <div className="column header-logo has-text-centered">
            <img src="/static/images/sjdg-logo-small-flipped.png" />
          </div>
        </div>
      </div>
    </div>

    <div className="hero-foot">
      <nav className="tabs is-boxed is-fullwidth">
        <div className="container">
          <ul>
            { sectionHeaders }
          </ul>
        </div>
      </nav>
    </div>
  </section>)
}

