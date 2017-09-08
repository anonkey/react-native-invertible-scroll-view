

import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import cloneReferencedElement from './cloneReferencedElement';
import ScrollableMixin from './ScrollableMixin';

type DefaultProps = {
  renderScrollComponent: (props: Object) => ReactElement;
};

const InvertibleScrollView = createReactClass({
  mixins: [ScrollableMixin],

  propTypes: {
    ...ScrollView.propTypes,
    inverted: PropTypes.bool,
    renderScrollComponent: PropTypes.func.isRequired,
  },

  getDefaultProps(): DefaultProps {
    return {
      renderScrollComponent: props => <ScrollView {...props} />,
    };
  },

  getScrollResponder(): ReactComponent {
    return this._scrollComponent.getScrollResponder();
  },

  setNativeProps(props: Object) {
    this._scrollComponent.setNativeProps(props);
  },

  render() {
    const {
      inverted,
      renderScrollComponent,
      ...props
    } = this.props;

    if (inverted) {
      if (this.props.horizontal) {
        props.style = [styles.horizontallyInverted, props.style];
        props.children = this._renderInvertedChildren(props.children, styles.horizontallyInverted);
      } else {
        props.style = [styles.verticallyInverted, props.style];
        props.children = this._renderInvertedChildren(props.children, styles.verticallyInverted);
      }
    }

    return cloneReferencedElement(renderScrollComponent(props), {
      ref: (component) => { this._scrollComponent = component; },
    });
  },

  _renderInvertedChildren(children, inversionStyle) {
    return React.Children.map(children, child => child ? <View style={inversionStyle}>{child}</View> : child);
  },
});

let styles = StyleSheet.create({
  verticallyInverted: {
    flex: 1,
    transform: [
      { scaleY: -1 },
    ],
  },
  horizontallyInverted: {
    flex: 1,
    transform: [
      { scaleX: -1 },
    ],
  },
});

module.exports = InvertibleScrollView;
