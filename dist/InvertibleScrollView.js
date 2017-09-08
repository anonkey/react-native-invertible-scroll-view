(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'create-react-class', 'prop-types', 'react', './cloneReferencedElement', 'react-native', './ScrollableMixin'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('create-react-class'), require('prop-types'), require('react'), require('./cloneReferencedElement'), require('react-native'), require('./ScrollableMixin'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.createReactClass, global.propTypes, global.react, global.cloneReferencedElement, global.reactNative, global.ScrollableMixin);
    global.InvertibleScrollView = mod.exports;
  }
})(this, function (module, _createReactClass, _propTypes, _react, _cloneReferencedElement, _reactNative, _ScrollableMixin) {
  'use strict';

  var _createReactClass2 = _interopRequireDefault(_createReactClass);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _react2 = _interopRequireDefault(_react);

  var _cloneReferencedElement2 = _interopRequireDefault(_cloneReferencedElement);

  var _ScrollableMixin2 = _interopRequireDefault(_ScrollableMixin);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var InvertibleScrollView = (0, _createReactClass2.default)({
    displayName: 'InvertibleScrollView',

    mixins: [_ScrollableMixin2.default],

    propTypes: _extends({}, _reactNative.ScrollView.propTypes, {
      inverted: _propTypes2.default.bool,
      renderScrollComponent: _propTypes2.default.func.isRequired
    }),

    getDefaultProps: function getDefaultProps() {
      return {
        renderScrollComponent: function renderScrollComponent(props) {
          return _react2.default.createElement(_reactNative.ScrollView, props);
        }
      };
    },
    getScrollResponder: function getScrollResponder() {
      return this._scrollComponent.getScrollResponder();
    },
    setNativeProps: function setNativeProps(props) {
      this._scrollComponent.setNativeProps(props);
    },
    render: function render() {
      var _this = this;

      var _props = this.props,
          inverted = _props.inverted,
          renderScrollComponent = _props.renderScrollComponent,
          props = _objectWithoutProperties(_props, ['inverted', 'renderScrollComponent']);

      if (inverted) {
        if (this.props.horizontal) {
          props.style = [styles.horizontallyInverted, props.style];
          props.children = this._renderInvertedChildren(props.children, styles.horizontallyInverted);
        } else {
          props.style = [styles.verticallyInverted, props.style];
          props.children = this._renderInvertedChildren(props.children, styles.verticallyInverted);
        }
      }

      return (0, _cloneReferencedElement2.default)(renderScrollComponent(props), {
        ref: function ref(component) {
          _this._scrollComponent = component;
        }
      });
    },
    _renderInvertedChildren: function _renderInvertedChildren(children, inversionStyle) {
      return _react2.default.Children.map(children, function (child) {
        return child ? _react2.default.createElement(
          _reactNative.View,
          { style: inversionStyle },
          child
        ) : child;
      });
    }
  });

  var styles = _reactNative.StyleSheet.create({
    verticallyInverted: {
      flex: 1,
      transform: [{ scaleY: -1 }]
    },
    horizontallyInverted: {
      flex: 1,
      transform: [{ scaleX: -1 }]
    }
  });

  module.exports = InvertibleScrollView;
});