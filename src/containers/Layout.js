import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { fetchCart } from "../store/actions/cart";

class CustomLayout extends React.Component {
  componentDidMount() {
    this.props.fetchCart();
  }

  render() {
    const { authenticated, cart, loading } = this.props;
    return (
      <div>
        <Menu size={"large"}>
          <Container style={{ padding: "0.3em 0em 0.3em 0em"}}>
            <Link to="/">
              <Menu.Item header>Главная</Menu.Item>
            </Link>
            <Link to="/products">
              <Menu.Item header>Сыры</Menu.Item>
            </Link>
            {authenticated ? (
              <React.Fragment>
                <Menu.Menu position="right">
                  <Link to="/profile">
                    <Menu.Item>Профиль</Menu.Item>
                  </Link>
                  <Dropdown
                    icon="cart"
                    loading={loading}
                    text={`${cart !== null ? cart.order_items.length : 0}`}
                    pointing
                    className="link item"
                  >
                    <Dropdown.Menu>
                      {cart !== null ? (
                        <React.Fragment>
                          {cart.order_items.map(order_item => {
                            return (
                              <Dropdown.Item key={order_item.id}>
                                {order_item.quantity} x {order_item.item.title} - {order_item.item.discount_price}Р
                              </Dropdown.Item>
                            );
                          })}
                          {cart.order_items.length < 1 ? (
                            <Dropdown.Item>Корзина пуста</Dropdown.Item>
                          ) : null}
                          <Dropdown.Divider />

                          <Dropdown.Item
                            icon="arrow right"
                            text="Перейти"
                            onClick={() =>
                              this.props.history.push("/order-summary")
                            }
                          />
                        </React.Fragment>
                      ) : (
                        <Dropdown.Item>Корзина пуста</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Menu.Item header onClick={() => this.props.logout()}>
                    Выйти
                  </Menu.Item>
                </Menu.Menu>
              </React.Fragment>
            ) : (
              <Menu.Menu position="right">
                <Link to="/login">
                  <Menu.Item header>Вход</Menu.Item>
                </Link>
                <Link to="/signup">
                  <Menu.Item header>Регистрация</Menu.Item>
                </Link>
              </Menu.Menu>
            )}
          </Container>
        </Menu>

        {this.props.children}

        <Segment
          inverted
          vertical
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Компания" />
                <List link inverted>
                  <List.Item as="a">Партнерская компания</List.Item>
                  <List.Item as="a">Для прессы</List.Item>
                  <List.Item as="a">О компании</List.Item>
                  <List.Item as="a">Акции</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Поддержка" />
                <List link inverted>
                  <List.Item as="a">Отзывы</List.Item>
                  <List.Item as="a">Форум</List.Item>
                  <List.Item as="a">Вакансии</List.Item>
                  <List.Item as="a">Работа</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Контакты" />
                <List link inverted>
                  <List.Item as="a">+7 (800) 555 35 35</List.Item>
                  <List.Item as="a">+7 (123) 456 55 55</List.Item>
                  <List.Item as="a">+7 (999) 183 24 24</List.Item>
                  <List.Item as="a">+7 (987) 123 45 67</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header inverted as="h4" content="Наш адрес" />
                <p>
                  143800, Московская Область, рп Лотошино, ул. Центральная, д.18, к3, апартамены 14
                </p>
              </Grid.Column>
            </Grid>

            <Divider inverted section />
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
                Карта Сайта
              </List.Item>
              <List.Item as="a" href="#">
                Свяжитесь с Нами
              </List.Item>
              <List.Item as="a" href="#">
                Условия и Положения
              </List.Item>
              <List.Item as="a" href="#">
                Политика Конфиденциальности
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart,
    loading: state.cart.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
