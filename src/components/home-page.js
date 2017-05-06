const React = require('react');

class HomePage extends React.Component {
  render() {
    const i18n = this.props.i18n;
    const t = i18n.t.bind(i18n);
    i18n.setLang(this.props.lang);

    const events = this.props.events;

    return (
      <section>
        <ul>{events.map((event, index) => <li key={index}>{t(event.nameKey)}</li>)}</ul>
      </section>
    );
  }
}

module.exports = HomePage;
