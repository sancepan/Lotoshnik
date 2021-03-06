import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Button,
  Container,
  Dimmer, Divider, Form, Icon,
  Image,
  Item,
  Label,
  Loader,
  Message,
  Segment, Select
} from "semantic-ui-react";
import { productListURL, addToCartURL } from "../constants";
import { fetchCart } from "../store/actions/cart";
import { authAxios } from "../utils";

class ProductList extends React.Component {
  state = {
    loading: false,
    error: null,
    data: []
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(productListURL)
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  }

  handleAddToCart = slug => {
    this.setState({ loading: true });
    authAxios
      .post(addToCartURL, { slug })
      .then(res => {
        this.props.refreshCart();
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  render() {
    const { data, error, loading } = this.state;
    return (
      <Container style={{ padding: "3em 0em 3em 0em" }}>
        {error && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(error)}
          />
        )}
        {loading && (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>

            <Image src="/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
        <Item.Group divided>
          {data.map(item => {
            return (
              <Item key={item.id}>
                <Item.Image src={item.image} />
                <Item.Content>
                  <Item.Header
                    as="a"
                    onClick={() =>
                      this.props.history.push(`/products/${item.id}`)
                    }
                  >
                    {item.title}
                  </Item.Header>
                  <Item.Meta>
                    { item.label === "??????????" || item.label === "??????????????" ? (
                      <Label
                          floated="right"
                          labelPosition="right"
                        color={
                        item.label === "??????????"
                          ? "red"
                          : item.label === "??????????????"
                          ? "green"
                          : "none"
                        }
                      >
                        {item.label}
                      </Label>
                    ): ""}
                  </Item.Meta>
                  <Item.Meta>
                    <span className="cinema">{item.category}</span>
                  </Item.Meta>
                  <Item.Description>{item.description}</Item.Description>
                  <Item.Meta>
                    <span>{item.price}??? - 100??</span>
                  </Item.Meta>
                  <Item.Meta>
                    <span>{item.discount_price}??? - 1????</span>
                  </Item.Meta>

                  <Item.Meta>
                    {<Button
                      primary
                      floated="right"
                      icon
                      labelPosition="right"
                      onClick={() =>
                      this.props.history.push(`/products/${item.id}`)
                    }
                    >
                      ???????????????? ?? ??????????????
                      <Icon name="cart plus" />
                    </Button> }
                  </Item.Meta>

                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProductList);
