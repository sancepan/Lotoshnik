import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "0em 0em 3em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Варим, доставляем, радуем
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Мы не только контролируем все этапы сыроварения,
              но и осуществляем доставку по всему городскому округу.
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Традиционные рецепты
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              В начале XIX века князь И.С.Мещерский поселил в своем имении сыродела
              из Швейцарии Иоганнеса Мюллера с семьей. Именно здесь начались первые
              эксперименты по изготовлению швейцарских сыров на русской земле.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              //bordered
              //rounded
              size="medium"
              src="http://www.free-lancers.net/posted_files/N7C672E95744C.jpg"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge">Узнать больше</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Доставка 10-20 мин
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Иначе заказ за наш счет
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              "Почему так быстро?"
            </Header>
            <p style={{ fontSize: "1.33em", padding: "0em 3em 0em 3em" }}>
              Наши сыры годами наставиваются на складе и требуют только упаковки и доставки
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
          <Image
            floated="left"
            size="medium"
            src="https://www.max-gift.ru/wp-content/uploads/IMG_4517.jpg"
          />
          </Grid.Column>

          <Grid.Column width={8}>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Оптимальная упаковка
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Наши специалисты придумали специальную упаковку,
            которая за счет формы и материала не даст расплавится или высушиться
            сырам и растечься добавкам
            на протяжении всего времени доставки.
          </p>
          </Grid.Column>
        </Grid.Row>
          <Grid.Row>
          <Grid.Column textAlign="center">
            <Button size="huge">Узнать больше</Button>
          </Grid.Column>
        </Grid.Row>
        </Grid>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
          <a href="#case-studies">Экскурсии (Только по воскресеньям)</a>
        </Divider>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Не хотите поговорить о наших сырах?
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Сыр всегда пользовался и, вероятнее всего, будет пользоваться и в дальнейшем огромной
          популярностью среди почитателей подобных молочным продуктов. Существуют различные виды сыров,
          и посчитать их количество практически невозможно. Предлагаем разобраться, согласно каким критериям
          делятся сыры и рассмотреть самые популярные сорта данного молочного продукта на нашей фабрике с экскурсией.
        </p>
        <Button as="a" size="large">
          Записаться на экскурсию
        </Button>
      </Container>
    </Segment>
  </ResponsiveContainer>
);
export default HomepageLayout;
