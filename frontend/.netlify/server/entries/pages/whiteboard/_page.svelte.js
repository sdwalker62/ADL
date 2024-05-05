import { c as create_ssr_component, r as getContext, b as subscribe, a as add_attribute, e as escape, v as validate_component, g as get_store_value, h as add_styles, k as merge_ssr_styles, s as setContext, l as createEventDispatcher, o as onDestroy, m as missing_component, f as each, p as compute_rest_props, i as spread, q as escape_attribute_value, j as escape_object, t as hasContext, u as compute_slots, w as noop, n as null_to_empty } from "../../../chunks/ssr.js";
import { w as writable, d as derived, r as readable } from "../../../chunks/index2.js";
import cc from "classcat";
import { Position, ConnectionMode, areConnectionMapsEqual, handleConnectionChange, errorMessages, getBezierPath, getSmoothStepPath, getStraightPath, adoptUserProvidedNodes, updateConnectionLookup, internalsSymbol, ConnectionLineType, getNodesBounds, getViewportForBounds, infiniteExtent, SelectionMode, devWarn, isEdgeVisible, getEdgePosition, getElevatedEdgeZIndex, getNodesInside, getElementsToRemove, addEdge, updateNodeDimensions, fitView, panBy, createMarkerIds, getNodeDimensions, getPositionWithOrigin, nodeHasDimensions, getMarkerId, MarkerType, isMacOs, PanOnScrollMode } from "@xyflow/system";
import "@svelte-put/shortcut";
const Handle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let connectionInProcess;
  let connectingFrom;
  let connectingTo;
  let isPossibleEndHandle;
  let valid;
  let $connection, $$unsubscribe_connection;
  let $connectionMode, $$unsubscribe_connectionMode;
  let $connectionLookup, $$unsubscribe_connectionLookup;
  let $$unsubscribe_edges;
  let $$unsubscribe_viewport;
  let $$unsubscribe_onConnectEndAction;
  let $$unsubscribe_onConnectStartAction;
  let $$unsubscribe_onConnectAction;
  let $$unsubscribe_onedgecreate;
  let $$unsubscribe_isValidConnection;
  let $flowId, $$unsubscribe_flowId;
  let $$unsubscribe_autoPanOnConnect;
  let $$unsubscribe_lib;
  let $$unsubscribe_nodes;
  let $$unsubscribe_domNode;
  let $$unsubscribe_connectionRadius;
  let $connectable, $$unsubscribe_connectable;
  let { id = void 0 } = $$props;
  let { type = "source" } = $$props;
  let { position = Position.Top } = $$props;
  let { style = void 0 } = $$props;
  let { isConnectable = void 0 } = $$props;
  let { onconnect = void 0 } = $$props;
  let { ondisconnect = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  const isTarget = type === "target";
  const nodeId = getContext("svelteflow__node_id");
  const connectable = getContext("svelteflow__node_connectable");
  $$unsubscribe_connectable = subscribe(connectable, (value) => $connectable = value);
  const handleId = id || null;
  const store = useStore();
  const { connectionMode, domNode, nodes, connectionRadius, viewport, isValidConnection, lib, addEdge: addEdge2, onedgecreate, panBy: panBy2, cancelConnection, updateConnection, autoPanOnConnect, edges, connectionLookup, onconnect: onConnectAction, onconnectstart: onConnectStartAction, onconnectend: onConnectEndAction, flowId, connection } = store;
  $$unsubscribe_connectionMode = subscribe(connectionMode, (value) => $connectionMode = value);
  $$unsubscribe_domNode = subscribe(domNode, (value) => value);
  $$unsubscribe_nodes = subscribe(nodes, (value) => value);
  $$unsubscribe_connectionRadius = subscribe(connectionRadius, (value) => value);
  $$unsubscribe_viewport = subscribe(viewport, (value) => value);
  $$unsubscribe_isValidConnection = subscribe(isValidConnection, (value) => value);
  $$unsubscribe_lib = subscribe(lib, (value) => value);
  $$unsubscribe_onedgecreate = subscribe(onedgecreate, (value) => value);
  $$unsubscribe_autoPanOnConnect = subscribe(autoPanOnConnect, (value) => value);
  $$unsubscribe_edges = subscribe(edges, (value) => value);
  $$unsubscribe_connectionLookup = subscribe(connectionLookup, (value) => $connectionLookup = value);
  $$unsubscribe_onConnectAction = subscribe(onConnectAction, (value) => value);
  $$unsubscribe_onConnectStartAction = subscribe(onConnectStartAction, (value) => value);
  $$unsubscribe_onConnectEndAction = subscribe(onConnectEndAction, (value) => value);
  $$unsubscribe_flowId = subscribe(flowId, (value) => $flowId = value);
  $$unsubscribe_connection = subscribe(connection, (value) => $connection = value);
  let prevConnections = null;
  let connections;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.isConnectable === void 0 && $$bindings.isConnectable && isConnectable !== void 0)
    $$bindings.isConnectable(isConnectable);
  if ($$props.onconnect === void 0 && $$bindings.onconnect && onconnect !== void 0)
    $$bindings.onconnect(onconnect);
  if ($$props.ondisconnect === void 0 && $$bindings.ondisconnect && ondisconnect !== void 0)
    $$bindings.ondisconnect(ondisconnect);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  isConnectable = isConnectable !== void 0 ? isConnectable : $connectable;
  {
    if (onconnect || ondisconnect) {
      connections = $connectionLookup.get(`${nodeId}-${type}-${id || null}`);
    }
  }
  {
    {
      if (prevConnections && !areConnectionMapsEqual(connections, prevConnections)) {
        const _connections = connections ?? /* @__PURE__ */ new Map();
        handleConnectionChange(prevConnections, _connections, ondisconnect);
        handleConnectionChange(_connections, prevConnections, onconnect);
      }
      prevConnections = connections ?? /* @__PURE__ */ new Map();
    }
  }
  connectionInProcess = !!$connection.startHandle;
  connectingFrom = $connection.startHandle?.nodeId === nodeId && $connection.startHandle?.type === type && $connection.startHandle?.handleId === handleId;
  connectingTo = $connection.endHandle?.nodeId === nodeId && $connection.endHandle?.type === type && $connection.endHandle?.handleId === handleId;
  isPossibleEndHandle = $connectionMode === ConnectionMode.Strict ? $connection.startHandle?.type !== type : nodeId !== $connection.startHandle?.nodeId || handleId !== $connection.startHandle?.handleId;
  valid = connectingTo && $connection.status === "valid";
  $$unsubscribe_connection();
  $$unsubscribe_connectionMode();
  $$unsubscribe_connectionLookup();
  $$unsubscribe_edges();
  $$unsubscribe_viewport();
  $$unsubscribe_onConnectEndAction();
  $$unsubscribe_onConnectStartAction();
  $$unsubscribe_onConnectAction();
  $$unsubscribe_onedgecreate();
  $$unsubscribe_isValidConnection();
  $$unsubscribe_flowId();
  $$unsubscribe_autoPanOnConnect();
  $$unsubscribe_lib();
  $$unsubscribe_nodes();
  $$unsubscribe_domNode();
  $$unsubscribe_connectionRadius();
  $$unsubscribe_connectable();
  return ` <div${add_attribute("data-handleid", handleId, 0)}${add_attribute("data-nodeid", nodeId, 0)}${add_attribute("data-handlepos", position, 0)} data-id="${escape($flowId, true) + "-" + escape(nodeId, true) + "-" + escape(id || null, true) + "-" + escape(type, true)}" class="${[
    escape(
      cc([
        "svelte-flow__handle",
        `svelte-flow__handle-${position}`,
        "nodrag",
        "nopan",
        position,
        className
      ]),
      true
    ),
    (valid ? "valid" : "") + " " + (connectingTo ? "connectingto" : "") + " " + (connectingFrom ? "connectingfrom" : "") + " " + (!isTarget ? "source" : "") + " " + (isTarget ? "target" : "") + " " + (isConnectable ? "connectablestart" : "") + " " + (isConnectable ? "connectableend" : "") + " " + (isConnectable ? "connectable" : "") + " " + (isConnectable && (!connectionInProcess || isPossibleEndHandle) ? "connectionindicator" : "")
  ].join(" ").trim()}"${add_attribute("style", style, 0)} role="button" tabindex="-1">${slots.default ? slots.default({}) : ``}</div>`;
});
const DefaultNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = { label: "Node" } } = $$props;
  let { targetPosition = Position.Top } = $$props;
  let { sourcePosition = Position.Bottom } = $$props;
  let { id = "" } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { selected = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { dragging = false } = $$props;
  let { dragHandle = void 0 } = $$props;
  let { positionAbsoluteX = 0 } = $$props;
  let { positionAbsoluteY = 0 } = $$props;
  let { isConnectable } = $$props;
  let { zIndex } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0)
    $$bindings.targetPosition(targetPosition);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0)
    $$bindings.sourcePosition(sourcePosition);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.dragging === void 0 && $$bindings.dragging && dragging !== void 0)
    $$bindings.dragging(dragging);
  if ($$props.dragHandle === void 0 && $$bindings.dragHandle && dragHandle !== void 0)
    $$bindings.dragHandle(dragHandle);
  if ($$props.positionAbsoluteX === void 0 && $$bindings.positionAbsoluteX && positionAbsoluteX !== void 0)
    $$bindings.positionAbsoluteX(positionAbsoluteX);
  if ($$props.positionAbsoluteY === void 0 && $$bindings.positionAbsoluteY && positionAbsoluteY !== void 0)
    $$bindings.positionAbsoluteY(positionAbsoluteY);
  if ($$props.isConnectable === void 0 && $$bindings.isConnectable && isConnectable !== void 0)
    $$bindings.isConnectable(isConnectable);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  return `${validate_component(Handle, "Handle").$$render($$result, { type: "target", position: targetPosition }, {}, {})} ${escape(data?.label)} ${validate_component(Handle, "Handle").$$render($$result, { type: "source", position: sourcePosition }, {}, {})}`;
});
const InputNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = { label: "Node" } } = $$props;
  let { sourcePosition = Position.Bottom } = $$props;
  let { id = "" } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { selected = void 0 } = $$props;
  let { targetPosition = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { dragging = false } = $$props;
  let { dragHandle = void 0 } = $$props;
  let { positionAbsoluteX = 0 } = $$props;
  let { positionAbsoluteY = 0 } = $$props;
  let { isConnectable } = $$props;
  let { zIndex } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0)
    $$bindings.sourcePosition(sourcePosition);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0)
    $$bindings.targetPosition(targetPosition);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.dragging === void 0 && $$bindings.dragging && dragging !== void 0)
    $$bindings.dragging(dragging);
  if ($$props.dragHandle === void 0 && $$bindings.dragHandle && dragHandle !== void 0)
    $$bindings.dragHandle(dragHandle);
  if ($$props.positionAbsoluteX === void 0 && $$bindings.positionAbsoluteX && positionAbsoluteX !== void 0)
    $$bindings.positionAbsoluteX(positionAbsoluteX);
  if ($$props.positionAbsoluteY === void 0 && $$bindings.positionAbsoluteY && positionAbsoluteY !== void 0)
    $$bindings.positionAbsoluteY(positionAbsoluteY);
  if ($$props.isConnectable === void 0 && $$bindings.isConnectable && isConnectable !== void 0)
    $$bindings.isConnectable(isConnectable);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  return `${escape(data?.label)} ${validate_component(Handle, "Handle").$$render($$result, { type: "source", position: sourcePosition }, {}, {})}`;
});
const OutputNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = { label: "Node" } } = $$props;
  let { targetPosition = Position.Top } = $$props;
  let { id = "" } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { selected = void 0 } = $$props;
  let { sourcePosition = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { dragging = false } = $$props;
  let { dragHandle = void 0 } = $$props;
  let { positionAbsoluteX = 0 } = $$props;
  let { positionAbsoluteY = 0 } = $$props;
  let { isConnectable } = $$props;
  let { zIndex } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0)
    $$bindings.targetPosition(targetPosition);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0)
    $$bindings.sourcePosition(sourcePosition);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.dragging === void 0 && $$bindings.dragging && dragging !== void 0)
    $$bindings.dragging(dragging);
  if ($$props.dragHandle === void 0 && $$bindings.dragHandle && dragHandle !== void 0)
    $$bindings.dragHandle(dragHandle);
  if ($$props.positionAbsoluteX === void 0 && $$bindings.positionAbsoluteX && positionAbsoluteX !== void 0)
    $$bindings.positionAbsoluteX(positionAbsoluteX);
  if ($$props.positionAbsoluteY === void 0 && $$bindings.positionAbsoluteY && positionAbsoluteY !== void 0)
    $$bindings.positionAbsoluteY(positionAbsoluteY);
  if ($$props.isConnectable === void 0 && $$bindings.isConnectable && isConnectable !== void 0)
    $$bindings.isConnectable(isConnectable);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  return `${escape(data?.label)} ${validate_component(Handle, "Handle").$$render($$result, { type: "target", position: targetPosition }, {}, {})}`;
});
const GroupNode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "" } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { data = {} } = $$props;
  let { selected = void 0 } = $$props;
  let { sourcePosition = void 0 } = $$props;
  let { targetPosition = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { dragging = false } = $$props;
  let { dragHandle = void 0 } = $$props;
  let { positionAbsoluteX = 0 } = $$props;
  let { positionAbsoluteY = 0 } = $$props;
  let { isConnectable } = $$props;
  let { zIndex } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0)
    $$bindings.sourcePosition(sourcePosition);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0)
    $$bindings.targetPosition(targetPosition);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.dragging === void 0 && $$bindings.dragging && dragging !== void 0)
    $$bindings.dragging(dragging);
  if ($$props.dragHandle === void 0 && $$bindings.dragHandle && dragHandle !== void 0)
    $$bindings.dragHandle(dragHandle);
  if ($$props.positionAbsoluteX === void 0 && $$bindings.positionAbsoluteX && positionAbsoluteX !== void 0)
    $$bindings.positionAbsoluteX(positionAbsoluteX);
  if ($$props.positionAbsoluteY === void 0 && $$bindings.positionAbsoluteY && positionAbsoluteY !== void 0)
    $$bindings.positionAbsoluteY(positionAbsoluteY);
  if ($$props.isConnectable === void 0 && $$bindings.isConnectable && isConnectable !== void 0)
    $$bindings.isConnectable(isConnectable);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  return ``;
});
const EdgeLabelRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_domNode;
  const { domNode } = useStore();
  $$unsubscribe_domNode = subscribe(domNode, (value) => value);
  $$unsubscribe_domNode();
  return `<div>${slots.default ? slots.default({}) : ``}</div>`;
});
function useHandleEdgeSelect() {
  const { edgeLookup, selectionRect, selectionRectMode, multiselectionKeyPressed, addSelectedEdges, unselectNodesAndEdges, elementsSelectable } = useStore();
  return (id) => {
    const edge = get_store_value(edgeLookup).get(id);
    if (!edge) {
      console.warn("012", errorMessages["error012"](id));
      return;
    }
    const selectable = edge.selectable || get_store_value(elementsSelectable) && typeof edge.selectable === "undefined";
    if (selectable) {
      selectionRect.set(null);
      selectionRectMode.set(null);
      if (!edge.selected) {
        addSelectedEdges([id]);
      } else if (edge.selected && get_store_value(multiselectionKeyPressed)) {
        unselectNodesAndEdges({ nodes: [], edges: [edge] });
      }
    }
  };
}
const EdgeLabel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { style = void 0 } = $$props;
  let { x = void 0 } = $$props;
  let { y = void 0 } = $$props;
  useHandleEdgeSelect();
  getContext("svelteflow__edge_id");
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.x === void 0 && $$bindings.x && x !== void 0)
    $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  return `${validate_component(EdgeLabelRenderer, "EdgeLabelRenderer").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="svelte-flow__edge-label"${add_styles(merge_ssr_styles(escape("pointer-events: all;" + style, true), {
        "transform": `translate(-50%, -50%) translate(${x}px,${y}px)`
      }))} role="button" tabindex="-1">${slots.default ? slots.default({}) : ``}</div>`;
    }
  })}`;
});
const BaseEdge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = void 0 } = $$props;
  let { path } = $$props;
  let { label = void 0 } = $$props;
  let { labelX = void 0 } = $$props;
  let { labelY = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { interactionWidth = 20 } = $$props;
  let { class: className = void 0 } = $$props;
  let interactionWidthValue = interactionWidth === void 0 ? 20 : interactionWidth;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.path === void 0 && $$bindings.path && path !== void 0)
    $$bindings.path(path);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.labelX === void 0 && $$bindings.labelX && labelX !== void 0)
    $$bindings.labelX(labelX);
  if ($$props.labelY === void 0 && $$bindings.labelY && labelY !== void 0)
    $$bindings.labelY(labelY);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0)
    $$bindings.labelStyle(labelStyle);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0)
    $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0)
    $$bindings.markerEnd(markerEnd);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0)
    $$bindings.interactionWidth(interactionWidth);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<path${add_attribute("id", id, 0)}${add_attribute("d", path, 0)}${add_attribute("class", cc(["svelte-flow__edge-path", className]), 0)}${add_attribute("marker-start", markerStart, 0)}${add_attribute("marker-end", markerEnd, 0)} fill="none"${add_attribute("style", style, 0)}></path> ${interactionWidthValue ? `<path${add_attribute("d", path, 0)}${add_attribute("stroke-opacity", 0, 0)}${add_attribute("stroke-width", interactionWidthValue, 0)} fill="none" class="svelte-flow__edge-interaction"></path>` : ``} ${label ? `${validate_component(EdgeLabel, "EdgeLabel").$$render($$result, { x: labelX, y: labelY, style: labelStyle }, {}, {
    default: () => {
      return `${escape(label)}`;
    }
  })}` : ``}`;
});
const BezierEdgeInternal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let path;
  let labelX;
  let labelY;
  let { id = "" } = $$props;
  let { source = "" } = $$props;
  let { target = "" } = $$props;
  let { type = "default" } = $$props;
  let { animated = void 0 } = $$props;
  let { selected = void 0 } = $$props;
  let { label = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { data = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { interactionWidth = void 0 } = $$props;
  let { sourceX } = $$props;
  let { sourceY } = $$props;
  let { sourcePosition } = $$props;
  let { sourceHandleId = void 0 } = $$props;
  let { targetX } = $$props;
  let { targetY } = $$props;
  let { targetPosition } = $$props;
  let { targetHandleId = void 0 } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.animated === void 0 && $$bindings.animated && animated !== void 0)
    $$bindings.animated(animated);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0)
    $$bindings.labelStyle(labelStyle);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0)
    $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0)
    $$bindings.markerEnd(markerEnd);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0)
    $$bindings.interactionWidth(interactionWidth);
  if ($$props.sourceX === void 0 && $$bindings.sourceX && sourceX !== void 0)
    $$bindings.sourceX(sourceX);
  if ($$props.sourceY === void 0 && $$bindings.sourceY && sourceY !== void 0)
    $$bindings.sourceY(sourceY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0)
    $$bindings.sourcePosition(sourcePosition);
  if ($$props.sourceHandleId === void 0 && $$bindings.sourceHandleId && sourceHandleId !== void 0)
    $$bindings.sourceHandleId(sourceHandleId);
  if ($$props.targetX === void 0 && $$bindings.targetX && targetX !== void 0)
    $$bindings.targetX(targetX);
  if ($$props.targetY === void 0 && $$bindings.targetY && targetY !== void 0)
    $$bindings.targetY(targetY);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0)
    $$bindings.targetPosition(targetPosition);
  if ($$props.targetHandleId === void 0 && $$bindings.targetHandleId && targetHandleId !== void 0)
    $$bindings.targetHandleId(targetHandleId);
  [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  return `${validate_component(BaseEdge, "BaseEdge").$$render(
    $$result,
    {
      path,
      labelX,
      labelY,
      label,
      labelStyle,
      markerStart,
      markerEnd,
      interactionWidth,
      style
    },
    {},
    {}
  )}`;
});
const SmoothStepEdgeInternal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let path;
  let labelX;
  let labelY;
  let { id = "" } = $$props;
  let { source = "" } = $$props;
  let { target = "" } = $$props;
  let { type = "smoothstep" } = $$props;
  let { animated = void 0 } = $$props;
  let { selected = void 0 } = $$props;
  let { label = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { data = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { interactionWidth = void 0 } = $$props;
  let { sourceX } = $$props;
  let { sourceY } = $$props;
  let { sourcePosition } = $$props;
  let { sourceHandleId = void 0 } = $$props;
  let { targetX } = $$props;
  let { targetY } = $$props;
  let { targetPosition } = $$props;
  let { targetHandleId = void 0 } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.animated === void 0 && $$bindings.animated && animated !== void 0)
    $$bindings.animated(animated);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0)
    $$bindings.labelStyle(labelStyle);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0)
    $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0)
    $$bindings.markerEnd(markerEnd);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0)
    $$bindings.interactionWidth(interactionWidth);
  if ($$props.sourceX === void 0 && $$bindings.sourceX && sourceX !== void 0)
    $$bindings.sourceX(sourceX);
  if ($$props.sourceY === void 0 && $$bindings.sourceY && sourceY !== void 0)
    $$bindings.sourceY(sourceY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0)
    $$bindings.sourcePosition(sourcePosition);
  if ($$props.sourceHandleId === void 0 && $$bindings.sourceHandleId && sourceHandleId !== void 0)
    $$bindings.sourceHandleId(sourceHandleId);
  if ($$props.targetX === void 0 && $$bindings.targetX && targetX !== void 0)
    $$bindings.targetX(targetX);
  if ($$props.targetY === void 0 && $$bindings.targetY && targetY !== void 0)
    $$bindings.targetY(targetY);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0)
    $$bindings.targetPosition(targetPosition);
  if ($$props.targetHandleId === void 0 && $$bindings.targetHandleId && targetHandleId !== void 0)
    $$bindings.targetHandleId(targetHandleId);
  [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  return `${validate_component(BaseEdge, "BaseEdge").$$render(
    $$result,
    {
      path,
      labelX,
      labelY,
      label,
      labelStyle,
      markerStart,
      markerEnd,
      interactionWidth,
      style
    },
    {},
    {}
  )}`;
});
const StraightEdgeInternal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let path;
  let labelX;
  let labelY;
  let { id = "" } = $$props;
  let { source = "" } = $$props;
  let { target = "" } = $$props;
  let { type = "straight" } = $$props;
  let { animated = void 0 } = $$props;
  let { selected = void 0 } = $$props;
  let { label = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { data = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { interactionWidth = void 0 } = $$props;
  let { sourceX } = $$props;
  let { sourceY } = $$props;
  let { sourcePosition } = $$props;
  let { sourceHandleId = void 0 } = $$props;
  let { targetX } = $$props;
  let { targetY } = $$props;
  let { targetPosition } = $$props;
  let { targetHandleId = void 0 } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.animated === void 0 && $$bindings.animated && animated !== void 0)
    $$bindings.animated(animated);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0)
    $$bindings.labelStyle(labelStyle);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0)
    $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0)
    $$bindings.markerEnd(markerEnd);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0)
    $$bindings.interactionWidth(interactionWidth);
  if ($$props.sourceX === void 0 && $$bindings.sourceX && sourceX !== void 0)
    $$bindings.sourceX(sourceX);
  if ($$props.sourceY === void 0 && $$bindings.sourceY && sourceY !== void 0)
    $$bindings.sourceY(sourceY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0)
    $$bindings.sourcePosition(sourcePosition);
  if ($$props.sourceHandleId === void 0 && $$bindings.sourceHandleId && sourceHandleId !== void 0)
    $$bindings.sourceHandleId(sourceHandleId);
  if ($$props.targetX === void 0 && $$bindings.targetX && targetX !== void 0)
    $$bindings.targetX(targetX);
  if ($$props.targetY === void 0 && $$bindings.targetY && targetY !== void 0)
    $$bindings.targetY(targetY);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0)
    $$bindings.targetPosition(targetPosition);
  if ($$props.targetHandleId === void 0 && $$bindings.targetHandleId && targetHandleId !== void 0)
    $$bindings.targetHandleId(targetHandleId);
  [path, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  return `${validate_component(BaseEdge, "BaseEdge").$$render(
    $$result,
    {
      path,
      labelX,
      labelY,
      label,
      labelStyle,
      markerStart,
      markerEnd,
      interactionWidth,
      style
    },
    {},
    {}
  )}`;
});
const StepEdgeInternal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let path;
  let labelX;
  let labelY;
  let { id = "" } = $$props;
  let { source = "" } = $$props;
  let { target = "" } = $$props;
  let { type = "step" } = $$props;
  let { animated = void 0 } = $$props;
  let { selected = void 0 } = $$props;
  let { label = void 0 } = $$props;
  let { data = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { interactionWidth = void 0 } = $$props;
  let { sourceX } = $$props;
  let { sourceY } = $$props;
  let { sourcePosition } = $$props;
  let { sourceHandleId = void 0 } = $$props;
  let { targetX } = $$props;
  let { targetY } = $$props;
  let { targetPosition } = $$props;
  let { targetHandleId = void 0 } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.animated === void 0 && $$bindings.animated && animated !== void 0)
    $$bindings.animated(animated);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0)
    $$bindings.labelStyle(labelStyle);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0)
    $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0)
    $$bindings.markerEnd(markerEnd);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0)
    $$bindings.interactionWidth(interactionWidth);
  if ($$props.sourceX === void 0 && $$bindings.sourceX && sourceX !== void 0)
    $$bindings.sourceX(sourceX);
  if ($$props.sourceY === void 0 && $$bindings.sourceY && sourceY !== void 0)
    $$bindings.sourceY(sourceY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0)
    $$bindings.sourcePosition(sourcePosition);
  if ($$props.sourceHandleId === void 0 && $$bindings.sourceHandleId && sourceHandleId !== void 0)
    $$bindings.sourceHandleId(sourceHandleId);
  if ($$props.targetX === void 0 && $$bindings.targetX && targetX !== void 0)
    $$bindings.targetX(targetX);
  if ($$props.targetY === void 0 && $$bindings.targetY && targetY !== void 0)
    $$bindings.targetY(targetY);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0)
    $$bindings.targetPosition(targetPosition);
  if ($$props.targetHandleId === void 0 && $$bindings.targetHandleId && targetHandleId !== void 0)
    $$bindings.targetHandleId(targetHandleId);
  [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 0
  });
  return `${validate_component(BaseEdge, "BaseEdge").$$render(
    $$result,
    {
      path,
      labelX,
      labelY,
      label,
      labelStyle,
      markerStart,
      markerEnd,
      interactionWidth,
      style
    },
    {},
    {}
  )}`;
});
function syncNodeStores(nodesStore, userNodesStore) {
  const nodesStoreSetter = nodesStore.set;
  const userNodesStoreSetter = userNodesStore.set;
  const currentNodesStore = get_store_value(nodesStore);
  const currentUserNodesStore = get_store_value(userNodesStore);
  const initWithUserNodes = currentNodesStore.length === 0 && currentUserNodesStore.length > 0;
  let val = initWithUserNodes ? currentUserNodesStore : currentNodesStore;
  nodesStore.set(val);
  const _set = (nds) => {
    const updatedNodes = nodesStoreSetter(nds);
    val = updatedNodes;
    userNodesStoreSetter(val);
    return updatedNodes;
  };
  nodesStore.set = userNodesStore.set = _set;
  nodesStore.update = userNodesStore.update = (fn) => _set(fn(val));
}
function syncEdgeStores(edgesStore, userEdgesStore) {
  const nodesStoreSetter = edgesStore.set;
  const userEdgesStoreSetter = userEdgesStore.set;
  let val = get_store_value(userEdgesStore);
  edgesStore.set(val);
  const _set = (eds) => {
    nodesStoreSetter(eds);
    userEdgesStoreSetter(eds);
    val = eds;
  };
  edgesStore.set = userEdgesStore.set = _set;
  edgesStore.update = userEdgesStore.update = (fn) => _set(fn(val));
}
const syncViewportStores = (panZoomStore, viewportStore, userViewportStore) => {
  if (!userViewportStore) {
    return;
  }
  const panZoom = get_store_value(panZoomStore);
  const viewportStoreSetter = viewportStore.set;
  const userViewportStoreSetter = userViewportStore.set;
  let val = userViewportStore ? get_store_value(userViewportStore) : { x: 0, y: 0, zoom: 1 };
  viewportStore.set(val);
  viewportStore.set = (vp) => {
    viewportStoreSetter(vp);
    userViewportStoreSetter(vp);
    val = vp;
    return vp;
  };
  userViewportStore.set = (vp) => {
    panZoom?.syncViewport(vp);
    viewportStoreSetter(vp);
    userViewportStoreSetter(vp);
    val = vp;
    return vp;
  };
  viewportStore.update = (fn) => {
    viewportStore.set(fn(val));
  };
  userViewportStore.update = (fn) => {
    userViewportStore.set(fn(val));
  };
};
const createNodesStore = (nodes, nodeLookup) => {
  const { subscribe: subscribe2, set, update } = writable([]);
  let value = nodes;
  let defaults = {};
  let elevateNodesOnSelect = true;
  const _set = (nds) => {
    const nextNodes = adoptUserProvidedNodes(nds, nodeLookup, {
      elevateNodesOnSelect,
      defaults
    });
    value = nextNodes;
    set(value);
    return value;
  };
  const _update = (fn) => _set(fn(value));
  const setDefaultOptions = (options) => {
    defaults = options;
  };
  const setOptions = (options) => {
    elevateNodesOnSelect = options.elevateNodesOnSelect ?? elevateNodesOnSelect;
  };
  _set(value);
  return {
    subscribe: subscribe2,
    set: _set,
    update: _update,
    setDefaultOptions,
    setOptions
  };
};
const createEdgesStore = (edges, connectionLookup, edgeLookup, defaultOptions) => {
  const { subscribe: subscribe2, set, update } = writable([]);
  let value = edges;
  let defaults = {};
  const _set = (eds) => {
    const nextEdges = defaults ? eds.map((edge) => ({ ...defaults, ...edge })) : eds;
    updateConnectionLookup(connectionLookup, edgeLookup, nextEdges);
    value = nextEdges;
    set(value);
  };
  const _update = (fn) => _set(fn(value));
  const setDefaultOptions = (options) => {
    defaults = options;
  };
  _set(value);
  return {
    subscribe: subscribe2,
    set: _set,
    update: _update,
    setDefaultOptions
  };
};
const initConnectionProps = {
  path: null,
  sourceX: null,
  sourceY: null,
  sourcePosition: null,
  targetX: null,
  targetY: null,
  targetPosition: null,
  pointerPosition: null,
  startHandle: null,
  endHandle: null,
  status: null
};
const oppositePosition = {
  [Position.Left]: Position.Right,
  [Position.Right]: Position.Left,
  [Position.Top]: Position.Bottom,
  [Position.Bottom]: Position.Top
};
function getDerivedConnectionProps(store, currentConnection) {
  return derived([
    currentConnection,
    store.connectionLineType,
    store.connectionMode,
    store.nodeLookup,
    store.viewport
  ], ([connection, connectionLineType, connectionMode, nodeLookup, viewport]) => {
    if (!connection.connectionStartHandle?.nodeId) {
      return initConnectionProps;
    }
    const fromNode = nodeLookup.get(connection.connectionStartHandle?.nodeId);
    const fromHandleBounds = fromNode?.[internalsSymbol]?.handleBounds;
    const handleBoundsStrict = fromHandleBounds?.[connection.connectionStartHandle.type || "source"] || [];
    const handleBoundsLoose = handleBoundsStrict ? handleBoundsStrict : fromHandleBounds?.[connection?.connectionStartHandle?.type === "source" ? "target" : "source"];
    const handleBounds = connectionMode === ConnectionMode.Strict ? handleBoundsStrict : handleBoundsLoose;
    const fromHandle = connection.connectionStartHandle?.handleId ? handleBounds?.find((d) => d.id === connection.connectionStartHandle?.handleId) : handleBounds?.[0];
    const fromHandleX = fromHandle ? fromHandle.x + fromHandle.width / 2 : (fromNode?.computed?.width ?? 0) / 2;
    const fromHandleY = fromHandle ? fromHandle.y + fromHandle.height / 2 : fromNode?.computed?.height ?? 0;
    const fromX = (fromNode?.computed?.positionAbsolute?.x ?? 0) + fromHandleX;
    const fromY = (fromNode?.computed?.positionAbsolute?.y ?? 0) + fromHandleY;
    const fromPosition = fromHandle?.position;
    const toPosition = fromPosition ? oppositePosition[fromPosition] : void 0;
    const pathParams = {
      sourceX: fromX,
      sourceY: fromY,
      sourcePosition: fromPosition,
      targetX: ((connection.connectionPosition?.x ?? 0) - viewport.x) / viewport.zoom,
      targetY: ((connection.connectionPosition?.y ?? 0) - viewport.y) / viewport.zoom,
      targetPosition: toPosition
    };
    let path = "";
    if (connectionLineType === ConnectionLineType.Bezier) {
      [path] = getBezierPath(pathParams);
    } else if (connectionLineType === ConnectionLineType.Step) {
      [path] = getSmoothStepPath({
        ...pathParams,
        borderRadius: 0
      });
    } else if (connectionLineType === ConnectionLineType.SmoothStep) {
      [path] = getSmoothStepPath(pathParams);
    } else {
      [path] = getStraightPath(pathParams);
    }
    return {
      path,
      ...pathParams,
      pointerPosition: connection.connectionPosition,
      startHandle: connection.connectionStartHandle,
      endHandle: connection.connectionEndHandle,
      status: connection.connectionStatus
    };
  });
}
const initialNodeTypes = {
  input: InputNode,
  output: OutputNode,
  default: DefaultNode,
  group: GroupNode
};
const initialEdgeTypes = {
  straight: StraightEdgeInternal,
  smoothstep: SmoothStepEdgeInternal,
  default: BezierEdgeInternal,
  step: StepEdgeInternal
};
const getInitialStore = ({ nodes = [], edges = [], width, height, fitView: fitView2 }) => {
  const nodeLookup = /* @__PURE__ */ new Map();
  const nextNodes = adoptUserProvidedNodes(nodes, nodeLookup, {
    nodeOrigin: [0, 0],
    elevateNodesOnSelect: false
  });
  const connectionLookup = /* @__PURE__ */ new Map();
  const edgeLookup = /* @__PURE__ */ new Map();
  updateConnectionLookup(connectionLookup, edgeLookup, edges);
  let viewport = { x: 0, y: 0, zoom: 1 };
  if (fitView2 && width && height) {
    const nodesWithDimensions = nextNodes.filter((node) => node.width && node.height || node.initialWidth && node.initialHeight);
    const bounds = getNodesBounds(nodesWithDimensions, { nodeOrigin: [0, 0] });
    viewport = getViewportForBounds(bounds, width, height, 0.5, 2, 0.1);
  }
  return {
    flowId: writable(null),
    nodes: createNodesStore(nextNodes, nodeLookup),
    nodeLookup: readable(nodeLookup),
    edgeLookup: readable(edgeLookup),
    visibleNodes: readable([]),
    edges: createEdgesStore(edges, connectionLookup, edgeLookup),
    visibleEdges: readable([]),
    connectionLookup: readable(connectionLookup),
    height: writable(500),
    width: writable(500),
    minZoom: writable(0.5),
    maxZoom: writable(2),
    nodeOrigin: writable([0, 0]),
    nodeDragThreshold: writable(1),
    nodeExtent: writable(infiniteExtent),
    translateExtent: writable(infiniteExtent),
    autoPanOnNodeDrag: writable(true),
    autoPanOnConnect: writable(true),
    fitViewOnInit: writable(false),
    fitViewOnInitDone: writable(false),
    fitViewOptions: writable(void 0),
    panZoom: writable(null),
    snapGrid: writable(null),
    dragging: writable(false),
    selectionRect: writable(null),
    selectionKeyPressed: writable(false),
    multiselectionKeyPressed: writable(false),
    deleteKeyPressed: writable(false),
    panActivationKeyPressed: writable(false),
    zoomActivationKeyPressed: writable(false),
    selectionRectMode: writable(null),
    selectionMode: writable(SelectionMode.Partial),
    nodeTypes: writable(initialNodeTypes),
    edgeTypes: writable(initialEdgeTypes),
    viewport: writable(viewport),
    connectionMode: writable(ConnectionMode.Strict),
    domNode: writable(null),
    connection: readable(initConnectionProps),
    connectionLineType: writable(ConnectionLineType.Bezier),
    connectionRadius: writable(20),
    isValidConnection: writable(() => true),
    nodesDraggable: writable(true),
    nodesConnectable: writable(true),
    elementsSelectable: writable(true),
    selectNodesOnDrag: writable(true),
    markers: readable([]),
    defaultMarkerColor: writable("#b1b1b7"),
    lib: readable("svelte"),
    onlyRenderVisibleElements: writable(false),
    onerror: writable(devWarn),
    ondelete: writable(void 0),
    onedgecreate: writable(void 0),
    onconnect: writable(void 0),
    onconnectstart: writable(void 0),
    onconnectend: writable(void 0),
    onbeforedelete: writable(void 0),
    nodesInitialized: writable(false),
    edgesInitialized: writable(false),
    viewportInitialized: writable(false),
    initialized: readable(false)
  };
};
function getVisibleEdges(store) {
  const visibleEdges = derived([
    store.edges,
    store.nodes,
    store.nodeLookup,
    store.onlyRenderVisibleElements,
    store.viewport,
    store.width,
    store.height
  ], ([edges, , nodeLookup, onlyRenderVisibleElements, viewport, width, height]) => {
    const visibleEdges2 = onlyRenderVisibleElements && width && height ? edges.filter((edge) => {
      const sourceNode = nodeLookup.get(edge.source);
      const targetNode = nodeLookup.get(edge.target);
      return sourceNode && targetNode && isEdgeVisible({
        sourceNode,
        targetNode,
        width,
        height,
        transform: [viewport.x, viewport.y, viewport.zoom]
      });
    }) : edges;
    return visibleEdges2;
  });
  return derived([visibleEdges, store.nodes, store.nodeLookup, store.connectionMode, store.onerror], ([visibleEdges2, , nodeLookup, connectionMode, onerror]) => {
    const layoutedEdges = visibleEdges2.reduce((res, edge) => {
      const sourceNode = nodeLookup.get(edge.source);
      const targetNode = nodeLookup.get(edge.target);
      if (!sourceNode || !targetNode) {
        return res;
      }
      const edgePosition = getEdgePosition({
        id: edge.id,
        sourceNode,
        targetNode,
        sourceHandle: edge.sourceHandle || null,
        targetHandle: edge.targetHandle || null,
        connectionMode,
        onError: onerror
      });
      if (edgePosition) {
        res.push({
          ...edge,
          zIndex: getElevatedEdgeZIndex({
            selected: edge.selected,
            zIndex: edge.zIndex,
            sourceNode,
            targetNode,
            elevateOnSelect: false
          }),
          ...edgePosition
        });
      }
      return res;
    }, []);
    return layoutedEdges;
  });
}
function getVisibleNodes(store) {
  return derived([store.nodes, store.onlyRenderVisibleElements, store.width, store.height, store.viewport], ([nodes, onlyRenderVisibleElements, width, height, viewport]) => {
    const transform = [viewport.x, viewport.y, viewport.zoom];
    return onlyRenderVisibleElements ? getNodesInside(nodes, { x: 0, y: 0, width, height }, transform, true) : nodes;
  });
}
const key = Symbol();
function createStore({ nodes, edges, width, height, fitView: fitViewOnCreate }) {
  const store = getInitialStore({ nodes, edges, width, height, fitView: fitViewOnCreate });
  function setNodeTypes(nodeTypes) {
    store.nodeTypes.set({
      ...initialNodeTypes,
      ...nodeTypes
    });
  }
  function setEdgeTypes(edgeTypes) {
    store.edgeTypes.set({
      ...initialEdgeTypes,
      ...edgeTypes
    });
  }
  function addEdge$1(edgeParams) {
    const edges2 = get_store_value(store.edges);
    store.edges.set(addEdge(edgeParams, edges2));
  }
  const updateNodePositions = (nodeDragItems, dragging = false) => {
    const nodeLookup = get_store_value(store.nodeLookup);
    nodeDragItems.forEach((nodeDragItem) => {
      const node = nodeLookup.get(nodeDragItem.id);
      if (node) {
        node.position = nodeDragItem.position;
        node.dragging = dragging;
        node.computed = {
          ...node.computed,
          positionAbsolute: nodeDragItem.computed?.positionAbsolute
        };
      }
    });
    store.nodes.set(get_store_value(store.nodes));
  };
  function updateNodeDimensions$1(updates) {
    const nextNodes = updateNodeDimensions(updates, get_store_value(store.nodes), get_store_value(store.nodeLookup), get_store_value(store.domNode), get_store_value(store.nodeOrigin));
    if (!nextNodes) {
      return;
    }
    if (!get_store_value(store.fitViewOnInitDone) && get_store_value(store.fitViewOnInit)) {
      const fitViewOptions = get_store_value(store.fitViewOptions);
      const fitViewOnInitDone = fitView$1(nextNodes, {
        ...fitViewOptions,
        nodes: fitViewOptions?.nodes || nextNodes
      });
      store.fitViewOnInitDone.set(fitViewOnInitDone);
    }
    store.nodes.set(nextNodes);
    if (!get_store_value(store.nodesInitialized)) {
      store.nodesInitialized.set(true);
    }
  }
  function fitView$1(nodes2, options) {
    const panZoom = get_store_value(store.panZoom);
    if (!panZoom) {
      return false;
    }
    return fitView({
      nodes: nodes2,
      width: get_store_value(store.width),
      height: get_store_value(store.height),
      minZoom: get_store_value(store.minZoom),
      maxZoom: get_store_value(store.maxZoom),
      panZoom,
      nodeOrigin: get_store_value(store.nodeOrigin)
    }, options);
  }
  function zoomBy(factor, options) {
    const panZoom = get_store_value(store.panZoom);
    if (panZoom) {
      panZoom.scaleBy(factor, options);
    }
  }
  function zoomIn(options) {
    zoomBy(1.2, options);
  }
  function zoomOut(options) {
    zoomBy(1 / 1.2, options);
  }
  function setMinZoom(minZoom) {
    const panZoom = get_store_value(store.panZoom);
    if (panZoom) {
      panZoom.setScaleExtent([minZoom, get_store_value(store.maxZoom)]);
      store.minZoom.set(minZoom);
    }
  }
  function setMaxZoom(maxZoom) {
    const panZoom = get_store_value(store.panZoom);
    if (panZoom) {
      panZoom.setScaleExtent([get_store_value(store.minZoom), maxZoom]);
      store.maxZoom.set(maxZoom);
    }
  }
  function setTranslateExtent(extent) {
    const panZoom = get_store_value(store.panZoom);
    if (panZoom) {
      panZoom.setTranslateExtent(extent);
      store.translateExtent.set(extent);
    }
  }
  function resetSelectedElements(elements) {
    let elementsChanged = false;
    elements.forEach((element) => {
      if (element.selected) {
        element.selected = false;
        elementsChanged = true;
      }
    });
    return elementsChanged;
  }
  function unselectNodesAndEdges(params) {
    const resetNodes = resetSelectedElements(params?.nodes || get_store_value(store.nodes));
    if (resetNodes)
      store.nodes.set(get_store_value(store.nodes));
    const resetEdges = resetSelectedElements(params?.edges || get_store_value(store.edges));
    if (resetEdges)
      store.edges.set(get_store_value(store.edges));
  }
  store.deleteKeyPressed.subscribe(async (deleteKeyPressed) => {
    if (deleteKeyPressed) {
      const nodes2 = get_store_value(store.nodes);
      const edges2 = get_store_value(store.edges);
      const selectedNodes = nodes2.filter((node) => node.selected);
      const selectedEdges = edges2.filter((edge) => edge.selected);
      const { nodes: matchingNodes, edges: matchingEdges } = await getElementsToRemove({
        nodesToRemove: selectedNodes,
        edgesToRemove: selectedEdges,
        nodes: nodes2,
        edges: edges2,
        onBeforeDelete: get_store_value(store.onbeforedelete)
      });
      if (matchingNodes.length || matchingEdges.length) {
        store.nodes.update((nds) => nds.filter((node) => !matchingNodes.some((mN) => mN.id === node.id)));
        store.edges.update((eds) => eds.filter((edge) => !matchingEdges.some((mE) => mE.id === edge.id)));
        get_store_value(store.ondelete)?.({
          nodes: matchingNodes,
          edges: matchingEdges
        });
      }
    }
  });
  function addSelectedNodes(ids) {
    const isMultiSelection = get_store_value(store.multiselectionKeyPressed);
    store.nodes.update((ns) => ns.map((node) => {
      const nodeWillBeSelected = ids.includes(node.id);
      const selected = isMultiSelection ? node.selected || nodeWillBeSelected : nodeWillBeSelected;
      node.selected = selected;
      return node;
    }));
    if (!isMultiSelection) {
      store.edges.update((es) => es.map((edge) => {
        edge.selected = false;
        return edge;
      }));
    }
  }
  function addSelectedEdges(ids) {
    const isMultiSelection = get_store_value(store.multiselectionKeyPressed);
    store.edges.update((edges2) => edges2.map((edge) => {
      const edgeWillBeSelected = ids.includes(edge.id);
      const selected = isMultiSelection ? edge.selected || edgeWillBeSelected : edgeWillBeSelected;
      edge.selected = selected;
      return edge;
    }));
    if (!isMultiSelection) {
      store.nodes.update((ns) => ns.map((node) => {
        node.selected = false;
        return node;
      }));
    }
  }
  function handleNodeSelection(id) {
    const node = get_store_value(store.nodes)?.find((n) => n.id === id);
    if (!node) {
      console.warn("012", errorMessages["error012"](id));
      return;
    }
    store.selectionRect.set(null);
    store.selectionRectMode.set(null);
    if (!node.selected) {
      addSelectedNodes([id]);
    } else if (node.selected && get_store_value(store.multiselectionKeyPressed)) {
      unselectNodesAndEdges({ nodes: [node], edges: [] });
    }
  }
  function panBy$1(delta) {
    const viewport = get_store_value(store.viewport);
    return panBy({
      delta,
      panZoom: get_store_value(store.panZoom),
      transform: [viewport.x, viewport.y, viewport.zoom],
      translateExtent: get_store_value(store.translateExtent),
      width: get_store_value(store.width),
      height: get_store_value(store.height)
    });
  }
  const initConnectionUpdateData = {
    connectionStartHandle: null,
    connectionEndHandle: null,
    connectionPosition: null,
    connectionStatus: null
  };
  const currentConnection = writable(initConnectionUpdateData);
  const updateConnection = (newConnection) => {
    currentConnection.set(newConnection);
  };
  function cancelConnection() {
    updateConnection(initConnectionUpdateData);
  }
  function reset() {
    store.fitViewOnInitDone.set(false);
    store.selectionRect.set(null);
    store.selectionRectMode.set(null);
    store.snapGrid.set(null);
    store.isValidConnection.set(() => true);
    store.nodes.set([]);
    store.edges.set([]);
    unselectNodesAndEdges();
    cancelConnection();
  }
  return {
    // state
    ...store,
    // derived state
    connection: getDerivedConnectionProps(store, currentConnection),
    visibleEdges: getVisibleEdges(store),
    visibleNodes: getVisibleNodes(store),
    markers: derived([store.edges, store.defaultMarkerColor, store.flowId], ([edges2, defaultColor, id]) => createMarkerIds(edges2, { defaultColor, id })),
    initialized: (() => {
      let initialized = false;
      const initialNodesLength = get_store_value(store.nodes).length;
      const initialEdgesLength = get_store_value(store.edges).length;
      return derived([store.nodesInitialized, store.edgesInitialized, store.viewportInitialized], ([nodesInitialized, edgesInitialized, viewportInitialized]) => {
        if (initialized)
          return initialized;
        if (initialNodesLength === 0) {
          initialized = viewportInitialized;
        } else if (initialEdgesLength === 0) {
          initialized = viewportInitialized && nodesInitialized;
        } else {
          initialized = viewportInitialized && nodesInitialized && edgesInitialized;
        }
        return initialized;
      });
    })(),
    // actions
    syncNodeStores: (nodes2) => syncNodeStores(store.nodes, nodes2),
    syncEdgeStores: (edges2) => syncEdgeStores(store.edges, edges2),
    syncViewport: (viewport) => syncViewportStores(store.panZoom, store.viewport, viewport),
    setNodeTypes,
    setEdgeTypes,
    addEdge: addEdge$1,
    updateNodePositions,
    updateNodeDimensions: updateNodeDimensions$1,
    zoomIn,
    zoomOut,
    fitView: (options) => fitView$1(get_store_value(store.nodes), options),
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    unselectNodesAndEdges,
    addSelectedNodes,
    addSelectedEdges,
    handleNodeSelection,
    panBy: panBy$1,
    updateConnection,
    cancelConnection,
    reset
  };
}
function useStore() {
  const store = getContext(key);
  if (!store) {
    throw new Error("In order to use useStore you need to wrap your component in a <SvelteFlowProvider />");
  }
  return store.getStore();
}
function createStoreContext({ nodes, edges, width, height, fitView: fitView2 }) {
  const store = createStore({ nodes, edges, width, height, fitView: fitView2 });
  setContext(key, {
    getStore: () => store
  });
  return store;
}
const css$8 = {
  code: ".svelte-flow__zoom.svelte-4xkw84{width:100%;height:100%;position:absolute;top:0;left:0;z-index:4}",
  map: `{"version":3,"file":"Zoom.svelte","sources":["Zoom.svelte"],"sourcesContent":["<script>import { PanOnScrollMode } from '@xyflow/system';\\nimport { useStore } from '../../store';\\nimport zoom from '../../actions/zoom';\\nimport { onMount } from 'svelte';\\nexport let initialViewport;\\nexport let onMoveStart = undefined;\\nexport let onMove = undefined;\\nexport let onMoveEnd = undefined;\\nexport let panOnScrollMode;\\nexport let preventScrolling;\\nexport let zoomOnScroll;\\nexport let zoomOnDoubleClick;\\nexport let zoomOnPinch;\\nexport let panOnDrag;\\nexport let panOnScroll;\\nconst { viewport, panZoom, selectionKeyPressed, minZoom, maxZoom, dragging, translateExtent, lib, panActivationKeyPressed, zoomActivationKeyPressed, viewportInitialized } = useStore();\\n$: viewPort = initialViewport || { x: 0, y: 0, zoom: 1 };\\n$: _panOnDrag = $panActivationKeyPressed || panOnDrag;\\n$: _panOnScroll = $panActivationKeyPressed || panOnScroll;\\nonMount(() => {\\n    $viewportInitialized = true;\\n});\\n<\/script>\\n\\n<div\\n  class=\\"svelte-flow__zoom\\"\\n  use:zoom={{\\n    viewport,\\n    minZoom: $minZoom,\\n    maxZoom: $maxZoom,\\n    initialViewport: viewPort,\\n    dragging,\\n    panZoom,\\n    onPanZoomStart: onMoveStart,\\n    onPanZoom: onMove,\\n    onPanZoomEnd: onMoveEnd,\\n    zoomOnScroll,\\n    zoomOnDoubleClick,\\n    zoomOnPinch,\\n    panOnScroll: _panOnScroll,\\n    panOnDrag: _panOnDrag,\\n    panOnScrollSpeed: 0.5,\\n    panOnScrollMode: panOnScrollMode || PanOnScrollMode.Free,\\n    zoomActivationKeyPressed: $zoomActivationKeyPressed,\\n    preventScrolling: typeof preventScrolling === 'boolean' ? preventScrolling : true,\\n    noPanClassName: 'nopan',\\n    noWheelClassName: 'nowheel',\\n    userSelectionActive: $selectionKeyPressed,\\n    translateExtent: $translateExtent,\\n    lib: $lib\\n  }}\\n>\\n  <slot />\\n</div>\\n\\n<style>\\n  .svelte-flow__zoom {\\n    width: 100%;\\n    height: 100%;\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    z-index: 4;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAwDE,gCAAmB,CACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,CACX"}`
};
const Zoom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_viewportInitialized;
  let $$unsubscribe_panActivationKeyPressed;
  let $$unsubscribe_minZoom;
  let $$unsubscribe_maxZoom;
  let $$unsubscribe_zoomActivationKeyPressed;
  let $$unsubscribe_selectionKeyPressed;
  let $$unsubscribe_translateExtent;
  let $$unsubscribe_lib;
  let { initialViewport } = $$props;
  let { onMoveStart = void 0 } = $$props;
  let { onMove = void 0 } = $$props;
  let { onMoveEnd = void 0 } = $$props;
  let { panOnScrollMode } = $$props;
  let { preventScrolling } = $$props;
  let { zoomOnScroll } = $$props;
  let { zoomOnDoubleClick } = $$props;
  let { zoomOnPinch } = $$props;
  let { panOnDrag } = $$props;
  let { panOnScroll } = $$props;
  const { viewport, panZoom, selectionKeyPressed, minZoom, maxZoom, dragging, translateExtent, lib, panActivationKeyPressed, zoomActivationKeyPressed, viewportInitialized } = useStore();
  $$unsubscribe_selectionKeyPressed = subscribe(selectionKeyPressed, (value) => value);
  $$unsubscribe_minZoom = subscribe(minZoom, (value) => value);
  $$unsubscribe_maxZoom = subscribe(maxZoom, (value) => value);
  $$unsubscribe_translateExtent = subscribe(translateExtent, (value) => value);
  $$unsubscribe_lib = subscribe(lib, (value) => value);
  $$unsubscribe_panActivationKeyPressed = subscribe(panActivationKeyPressed, (value) => value);
  $$unsubscribe_zoomActivationKeyPressed = subscribe(zoomActivationKeyPressed, (value) => value);
  $$unsubscribe_viewportInitialized = subscribe(viewportInitialized, (value) => value);
  if ($$props.initialViewport === void 0 && $$bindings.initialViewport && initialViewport !== void 0)
    $$bindings.initialViewport(initialViewport);
  if ($$props.onMoveStart === void 0 && $$bindings.onMoveStart && onMoveStart !== void 0)
    $$bindings.onMoveStart(onMoveStart);
  if ($$props.onMove === void 0 && $$bindings.onMove && onMove !== void 0)
    $$bindings.onMove(onMove);
  if ($$props.onMoveEnd === void 0 && $$bindings.onMoveEnd && onMoveEnd !== void 0)
    $$bindings.onMoveEnd(onMoveEnd);
  if ($$props.panOnScrollMode === void 0 && $$bindings.panOnScrollMode && panOnScrollMode !== void 0)
    $$bindings.panOnScrollMode(panOnScrollMode);
  if ($$props.preventScrolling === void 0 && $$bindings.preventScrolling && preventScrolling !== void 0)
    $$bindings.preventScrolling(preventScrolling);
  if ($$props.zoomOnScroll === void 0 && $$bindings.zoomOnScroll && zoomOnScroll !== void 0)
    $$bindings.zoomOnScroll(zoomOnScroll);
  if ($$props.zoomOnDoubleClick === void 0 && $$bindings.zoomOnDoubleClick && zoomOnDoubleClick !== void 0)
    $$bindings.zoomOnDoubleClick(zoomOnDoubleClick);
  if ($$props.zoomOnPinch === void 0 && $$bindings.zoomOnPinch && zoomOnPinch !== void 0)
    $$bindings.zoomOnPinch(zoomOnPinch);
  if ($$props.panOnDrag === void 0 && $$bindings.panOnDrag && panOnDrag !== void 0)
    $$bindings.panOnDrag(panOnDrag);
  if ($$props.panOnScroll === void 0 && $$bindings.panOnScroll && panOnScroll !== void 0)
    $$bindings.panOnScroll(panOnScroll);
  $$result.css.add(css$8);
  $$unsubscribe_viewportInitialized();
  $$unsubscribe_panActivationKeyPressed();
  $$unsubscribe_minZoom();
  $$unsubscribe_maxZoom();
  $$unsubscribe_zoomActivationKeyPressed();
  $$unsubscribe_selectionKeyPressed();
  $$unsubscribe_translateExtent();
  $$unsubscribe_lib();
  return `<div class="svelte-flow__zoom svelte-4xkw84">${slots.default ? slots.default({}) : ``} </div>`;
});
const css$7 = {
  code: ".svelte-flow__pane.svelte-1esy7hx{position:absolute;top:0;left:0;width:100%;height:100%}",
  map: `{"version":3,"file":"Pane.svelte","sources":["Pane.svelte"],"sourcesContent":["<script context=\\"module\\">export function wrapHandler(handler, container) {\\n    return (event) => {\\n        if (event.target !== container) {\\n            return;\\n        }\\n        handler?.(event);\\n    };\\n}\\nexport function toggleSelected(ids) {\\n    return (item) => {\\n        const isSelected = ids.includes(item.id);\\n        if (item.selected !== isSelected) {\\n            return {\\n                ...item,\\n                selected: isSelected\\n            };\\n        }\\n        return item;\\n    };\\n}\\n<\/script>\\n\\n<script>import { createEventDispatcher } from 'svelte';\\nimport { SelectionMode, getEventPosition, getNodesInside, getConnectedEdges } from '@xyflow/system';\\nimport { useStore } from '../../store';\\nexport let panOnDrag = undefined;\\nexport let selectionOnDrag = undefined;\\nconst dispatch = createEventDispatcher();\\nconst { nodes, edges, viewport, dragging, elementsSelectable, selectionRect, selectionRectMode, selectionKeyPressed, selectionMode, panActivationKeyPressed, unselectNodesAndEdges } = useStore();\\nlet container;\\nlet containerBounds = null;\\nlet selectedNodes = [];\\n$: _panOnDrag = $panActivationKeyPressed || panOnDrag;\\n$: isSelecting =\\n    $selectionKeyPressed || $selectionRect || (selectionOnDrag && _panOnDrag !== true);\\n$: hasActiveSelection = $elementsSelectable && (isSelecting || $selectionRectMode === 'user');\\nfunction onClick(event) {\\n    dispatch('paneclick', { event });\\n    unselectNodesAndEdges();\\n    selectionRectMode.set(null);\\n}\\nfunction onMouseDown(event) {\\n    containerBounds = container.getBoundingClientRect();\\n    if (!elementsSelectable ||\\n        !isSelecting ||\\n        event.button !== 0 ||\\n        event.target !== container ||\\n        !containerBounds) {\\n        return;\\n    }\\n    const { x, y } = getEventPosition(event, containerBounds);\\n    unselectNodesAndEdges();\\n    selectionRect.set({\\n        width: 0,\\n        height: 0,\\n        startX: x,\\n        startY: y,\\n        x,\\n        y\\n    });\\n    // onSelectionStart?.(event);\\n}\\nfunction onMouseMove(event) {\\n    if (!isSelecting || !containerBounds || !$selectionRect) {\\n        return;\\n    }\\n    const mousePos = getEventPosition(event, containerBounds);\\n    const startX = $selectionRect.startX ?? 0;\\n    const startY = $selectionRect.startY ?? 0;\\n    const nextUserSelectRect = {\\n        ...$selectionRect,\\n        x: mousePos.x < startX ? mousePos.x : startX,\\n        y: mousePos.y < startY ? mousePos.y : startY,\\n        width: Math.abs(mousePos.x - startX),\\n        height: Math.abs(mousePos.y - startY)\\n    };\\n    const prevSelectedNodeIds = selectedNodes.map((n) => n.id);\\n    const prevSelectedEdgeIds = getConnectedEdges(selectedNodes, $edges).map((e) => e.id);\\n    selectedNodes = getNodesInside($nodes, nextUserSelectRect, [$viewport.x, $viewport.y, $viewport.zoom], $selectionMode === SelectionMode.Partial, true);\\n    const selectedEdgeIds = getConnectedEdges(selectedNodes, $edges).map((e) => e.id);\\n    const selectedNodeIds = selectedNodes.map((n) => n.id);\\n    // this prevents unnecessary updates while updating the selection rectangle\\n    if (prevSelectedNodeIds.length !== selectedNodeIds.length ||\\n        selectedNodeIds.some((id) => !prevSelectedNodeIds.includes(id))) {\\n        nodes.update((nodes) => nodes.map(toggleSelected(selectedNodeIds)));\\n    }\\n    if (prevSelectedEdgeIds.length !== selectedEdgeIds.length ||\\n        selectedEdgeIds.some((id) => !prevSelectedEdgeIds.includes(id))) {\\n        edges.update((edges) => edges.map(toggleSelected(selectedEdgeIds)));\\n    }\\n    selectionRectMode.set('user');\\n    selectionRect.set(nextUserSelectRect);\\n}\\nfunction onMouseUp(event) {\\n    if (event.button !== 0) {\\n        return;\\n    }\\n    // We only want to trigger click functions when in selection mode if\\n    // the user did not move the mouse.\\n    if (!isSelecting && $selectionRectMode === 'user' && event.target === container) {\\n        onClick?.(event);\\n    }\\n    selectionRect.set(null);\\n    if (selectedNodes.length > 0) {\\n        selectionRectMode.set('nodes');\\n    }\\n    // onSelectionEnd?.(event);\\n}\\nconst onMouseLeave = () => {\\n    if ($selectionRectMode === 'user') {\\n        selectionRectMode.set(selectedNodes.length > 0 ? 'nodes' : null);\\n        //  onSelectionEnd?.(event);\\n    }\\n    selectionRect.set(null);\\n};\\nconst onContextMenu = (event) => {\\n    if (Array.isArray(_panOnDrag) && _panOnDrag?.includes(2)) {\\n        event.preventDefault();\\n        return;\\n    }\\n    dispatch('panecontextmenu', { event });\\n};\\n<\/script>\\n\\n<!-- svelte-ignore a11y-no-static-element-interactions -->\\n<!-- svelte-ignore a11y-click-events-have-key-events -->\\n<div\\n  bind:this={container}\\n  class=\\"svelte-flow__pane\\"\\n  class:draggable={panOnDrag}\\n  class:dragging={$dragging}\\n  class:selection={isSelecting}\\n  on:click={hasActiveSelection ? undefined : wrapHandler(onClick, container)}\\n  on:mousedown={hasActiveSelection ? onMouseDown : undefined}\\n  on:mousemove={hasActiveSelection ? onMouseMove : undefined}\\n  on:mouseup={hasActiveSelection ? onMouseUp : undefined}\\n  on:mouseleave={hasActiveSelection ? onMouseLeave : undefined}\\n  on:contextmenu={wrapHandler(onContextMenu, container)}\\n>\\n  <slot />\\n</div>\\n\\n<style>\\n  .svelte-flow__pane {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    height: 100%;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA+IE,iCAAmB,CACjB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV"}`
};
const Pane = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _panOnDrag;
  let isSelecting;
  let $$unsubscribe_selectionRectMode;
  let $$unsubscribe_edges;
  let $$unsubscribe_selectionMode;
  let $$unsubscribe_viewport;
  let $$unsubscribe_nodes;
  let $selectionRect, $$unsubscribe_selectionRect;
  let $$unsubscribe_elementsSelectable;
  let $selectionKeyPressed, $$unsubscribe_selectionKeyPressed;
  let $panActivationKeyPressed, $$unsubscribe_panActivationKeyPressed;
  let $dragging, $$unsubscribe_dragging;
  let { panOnDrag = void 0 } = $$props;
  let { selectionOnDrag = void 0 } = $$props;
  createEventDispatcher();
  const { nodes, edges, viewport, dragging, elementsSelectable, selectionRect, selectionRectMode, selectionKeyPressed, selectionMode, panActivationKeyPressed, unselectNodesAndEdges } = useStore();
  $$unsubscribe_nodes = subscribe(nodes, (value) => value);
  $$unsubscribe_edges = subscribe(edges, (value) => value);
  $$unsubscribe_viewport = subscribe(viewport, (value) => value);
  $$unsubscribe_dragging = subscribe(dragging, (value) => $dragging = value);
  $$unsubscribe_elementsSelectable = subscribe(elementsSelectable, (value) => value);
  $$unsubscribe_selectionRect = subscribe(selectionRect, (value) => $selectionRect = value);
  $$unsubscribe_selectionRectMode = subscribe(selectionRectMode, (value) => value);
  $$unsubscribe_selectionKeyPressed = subscribe(selectionKeyPressed, (value) => $selectionKeyPressed = value);
  $$unsubscribe_selectionMode = subscribe(selectionMode, (value) => value);
  $$unsubscribe_panActivationKeyPressed = subscribe(panActivationKeyPressed, (value) => $panActivationKeyPressed = value);
  let container;
  if ($$props.panOnDrag === void 0 && $$bindings.panOnDrag && panOnDrag !== void 0)
    $$bindings.panOnDrag(panOnDrag);
  if ($$props.selectionOnDrag === void 0 && $$bindings.selectionOnDrag && selectionOnDrag !== void 0)
    $$bindings.selectionOnDrag(selectionOnDrag);
  $$result.css.add(css$7);
  _panOnDrag = $panActivationKeyPressed || panOnDrag;
  isSelecting = $selectionKeyPressed || $selectionRect || selectionOnDrag && _panOnDrag !== true;
  $$unsubscribe_selectionRectMode();
  $$unsubscribe_edges();
  $$unsubscribe_selectionMode();
  $$unsubscribe_viewport();
  $$unsubscribe_nodes();
  $$unsubscribe_selectionRect();
  $$unsubscribe_elementsSelectable();
  $$unsubscribe_selectionKeyPressed();
  $$unsubscribe_panActivationKeyPressed();
  $$unsubscribe_dragging();
  return `  <div class="${[
    "svelte-flow__pane svelte-1esy7hx",
    (panOnDrag ? "draggable" : "") + " " + ($dragging ? "dragging" : "") + " " + (isSelecting ? "selection" : "")
  ].join(" ").trim()}"${add_attribute("this", container, 0)}>${slots.default ? slots.default({}) : ``} </div>`;
});
const css$6 = {
  code: ".svelte-flow__viewport.svelte-1floaup{width:100%;height:100%;position:absolute;top:0;left:0}",
  map: `{"version":3,"file":"Viewport.svelte","sources":["Viewport.svelte"],"sourcesContent":["<script>import { useStore } from '../../store';\\nconst { viewport } = useStore();\\n<\/script>\\n\\n<div\\n  class=\\"svelte-flow__viewport xyflow__viewport\\"\\n  style=\\"transform: translate({$viewport.x}px, {$viewport.y}px) scale({$viewport.zoom})\\"\\n>\\n  <slot />\\n</div>\\n\\n<style>\\n  .svelte-flow__viewport {\\n    width: 100%;\\n    height: 100%;\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAYE,qCAAuB,CACrB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CACR"}`
};
const Viewport = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $viewport, $$unsubscribe_viewport;
  const { viewport } = useStore();
  $$unsubscribe_viewport = subscribe(viewport, (value) => $viewport = value);
  $$result.css.add(css$6);
  $$unsubscribe_viewport();
  return `<div class="svelte-flow__viewport xyflow__viewport svelte-1floaup" style="${"transform: translate(" + escape($viewport.x, true) + "px, " + escape($viewport.y, true) + "px) scale(" + escape($viewport.zoom, true) + ")"}">${slots.default ? slots.default({}) : ``} </div>`;
});
function getNodeInlineStyleDimensions({ width, height, initialWidth, initialHeight, computedWidth, computedHeight }) {
  if (computedWidth === void 0 && computedHeight === void 0) {
    const styleWidth = width ?? initialWidth;
    const styleHeight = height ?? initialHeight;
    return {
      width: styleWidth ? `width:${styleWidth}px;` : "",
      height: styleHeight ? `height:${styleHeight}px;` : ""
    };
  }
  return {
    width: width ? `width:${width}px;` : "",
    height: height ? `height:${height}px;` : ""
  };
}
const NodeWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let nodeType;
  let nodeTypeValid;
  let nodeComponent;
  let inlineStyleDimensions;
  let $nodeTypes, $$unsubscribe_nodeTypes;
  let $connectableStore, $$unsubscribe_connectableStore;
  let { node } = $$props;
  let { id } = $$props;
  let { data = {} } = $$props;
  let { selected = false } = $$props;
  let { draggable = void 0 } = $$props;
  let { selectable = void 0 } = $$props;
  let { connectable = true } = $$props;
  let { hidden = false } = $$props;
  let { dragging = false } = $$props;
  let { resizeObserver = null } = $$props;
  let { style = void 0 } = $$props;
  let { type = "default" } = $$props;
  let { isParent = false } = $$props;
  let { positionX } = $$props;
  let { positionY } = $$props;
  let { positionOriginX } = $$props;
  let { positionOriginY } = $$props;
  let { sourcePosition = void 0 } = $$props;
  let { targetPosition = void 0 } = $$props;
  let { zIndex } = $$props;
  let { computedWidth = void 0 } = $$props;
  let { computedHeight = void 0 } = $$props;
  let { initialWidth = void 0 } = $$props;
  let { initialHeight = void 0 } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { dragHandle = void 0 } = $$props;
  let { initialized = false } = $$props;
  let { class: className = "" } = $$props;
  const store = useStore();
  const { nodeTypes, nodeDragThreshold, selectNodesOnDrag, handleNodeSelection, updateNodeDimensions: updateNodeDimensions2 } = store;
  $$unsubscribe_nodeTypes = subscribe(nodeTypes, (value) => $nodeTypes = value);
  let nodeRef;
  let prevNodeRef = null;
  createNodeEventDispatcher();
  const connectableStore = writable(connectable);
  $$unsubscribe_connectableStore = subscribe(connectableStore, (value) => $connectableStore = value);
  let prevType = void 0;
  let prevSourcePosition = void 0;
  let prevTargetPosition = void 0;
  setContext("svelteflow__node_id", id);
  setContext("svelteflow__node_connectable", connectableStore);
  onDestroy(() => {
    if (prevNodeRef) {
      resizeObserver?.unobserve(prevNodeRef);
    }
  });
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.draggable === void 0 && $$bindings.draggable && draggable !== void 0)
    $$bindings.draggable(draggable);
  if ($$props.selectable === void 0 && $$bindings.selectable && selectable !== void 0)
    $$bindings.selectable(selectable);
  if ($$props.connectable === void 0 && $$bindings.connectable && connectable !== void 0)
    $$bindings.connectable(connectable);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0)
    $$bindings.hidden(hidden);
  if ($$props.dragging === void 0 && $$bindings.dragging && dragging !== void 0)
    $$bindings.dragging(dragging);
  if ($$props.resizeObserver === void 0 && $$bindings.resizeObserver && resizeObserver !== void 0)
    $$bindings.resizeObserver(resizeObserver);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.isParent === void 0 && $$bindings.isParent && isParent !== void 0)
    $$bindings.isParent(isParent);
  if ($$props.positionX === void 0 && $$bindings.positionX && positionX !== void 0)
    $$bindings.positionX(positionX);
  if ($$props.positionY === void 0 && $$bindings.positionY && positionY !== void 0)
    $$bindings.positionY(positionY);
  if ($$props.positionOriginX === void 0 && $$bindings.positionOriginX && positionOriginX !== void 0)
    $$bindings.positionOriginX(positionOriginX);
  if ($$props.positionOriginY === void 0 && $$bindings.positionOriginY && positionOriginY !== void 0)
    $$bindings.positionOriginY(positionOriginY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0)
    $$bindings.sourcePosition(sourcePosition);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0)
    $$bindings.targetPosition(targetPosition);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  if ($$props.computedWidth === void 0 && $$bindings.computedWidth && computedWidth !== void 0)
    $$bindings.computedWidth(computedWidth);
  if ($$props.computedHeight === void 0 && $$bindings.computedHeight && computedHeight !== void 0)
    $$bindings.computedHeight(computedHeight);
  if ($$props.initialWidth === void 0 && $$bindings.initialWidth && initialWidth !== void 0)
    $$bindings.initialWidth(initialWidth);
  if ($$props.initialHeight === void 0 && $$bindings.initialHeight && initialHeight !== void 0)
    $$bindings.initialHeight(initialHeight);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.dragHandle === void 0 && $$bindings.dragHandle && dragHandle !== void 0)
    $$bindings.dragHandle(dragHandle);
  if ($$props.initialized === void 0 && $$bindings.initialized && initialized !== void 0)
    $$bindings.initialized(initialized);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  nodeType = type || "default";
  nodeTypeValid = !!$nodeTypes[nodeType];
  nodeComponent = $nodeTypes[nodeType] || DefaultNode;
  {
    {
      if (!nodeTypeValid) {
        console.warn("003", errorMessages["error003"](type));
      }
    }
  }
  inlineStyleDimensions = getNodeInlineStyleDimensions({
    width,
    height,
    initialWidth,
    initialHeight,
    computedWidth,
    computedHeight
  });
  {
    {
      connectableStore.set(!!connectable);
    }
  }
  {
    {
      const doUpdate = prevType && nodeType !== prevType || prevSourcePosition && sourcePosition !== prevSourcePosition || prevTargetPosition && targetPosition !== prevTargetPosition;
      if (doUpdate) {
        requestAnimationFrame(() => updateNodeDimensions2(/* @__PURE__ */ new Map([
          [
            id,
            {
              id,
              nodeElement: nodeRef,
              forceUpdate: true
            }
          ]
        ])));
      }
      prevType = nodeType;
      prevSourcePosition = sourcePosition;
      prevTargetPosition = targetPosition;
    }
  }
  {
    {
      if (resizeObserver && (nodeRef !== prevNodeRef || !initialized)) {
        prevNodeRef && resizeObserver.unobserve(prevNodeRef);
        prevNodeRef = nodeRef;
      }
    }
  }
  $$unsubscribe_nodeTypes();
  $$unsubscribe_connectableStore();
  return `    ${!hidden ? `<div${add_attribute("data-id", id, 0)} class="${[
    escape(cc(["svelte-flow__node", `svelte-flow__node-${nodeType}`, className]), true),
    (dragging ? "dragging" : "") + " " + (selected ? "selected" : "") + " " + (draggable ? "draggable" : "") + " " + (connectable ? "connectable" : "") + " " + (selectable ? "selectable" : "") + " " + (draggable ? "nopan" : "") + " " + (isParent ? "parent" : "")
  ].join(" ").trim()}"${add_styles(merge_ssr_styles(escape(style ?? "", true) + ";" + escape(inlineStyleDimensions.width, true) + escape(inlineStyleDimensions.height, true), {
    "z-index": zIndex,
    "transform": `translate(${positionOriginX}px, ${positionOriginY}px)`,
    "visibility": initialized ? "visible" : "hidden"
  }))}${add_attribute("this", nodeRef, 0)}>${validate_component(nodeComponent || missing_component, "svelte:component").$$render(
    $$result,
    {
      data,
      id,
      selected,
      sourcePosition,
      targetPosition,
      zIndex,
      dragging,
      dragHandle,
      type: nodeType,
      isConnectable: $connectableStore,
      positionAbsoluteX: positionX,
      positionAbsoluteY: positionY,
      width,
      height
    },
    {},
    {}
  )}</div>` : ``}`;
});
const css$5 = {
  code: ".svelte-flow__nodes.svelte-tf4uy4{width:100%;height:100%;position:absolute;left:0;top:0}",
  map: `{"version":3,"file":"NodeRenderer.svelte","sources":["NodeRenderer.svelte"],"sourcesContent":["<script>import { onDestroy } from 'svelte';\\nimport { internalsSymbol, getPositionWithOrigin, getNodeDimensions, nodeHasDimensions } from '@xyflow/system';\\nimport { NodeWrapper } from '../../components/NodeWrapper';\\nimport { useStore } from '../../store';\\nconst { visibleNodes, nodesDraggable, nodesConnectable, elementsSelectable, updateNodeDimensions } = useStore();\\nconst resizeObserver = typeof ResizeObserver === 'undefined'\\n    ? null\\n    : new ResizeObserver((entries) => {\\n        const updates = new Map();\\n        entries.forEach((entry) => {\\n            const id = entry.target.getAttribute('data-id');\\n            updates.set(id, {\\n                id,\\n                nodeElement: entry.target,\\n                forceUpdate: true\\n            });\\n        });\\n        updateNodeDimensions(updates);\\n    });\\nonDestroy(() => {\\n    resizeObserver?.disconnect();\\n});\\n<\/script>\\n\\n<div class=\\"svelte-flow__nodes\\">\\n  {#each $visibleNodes as node (node.id)}\\n    {@const nodeDimesions = getNodeDimensions(node)}\\n    {@const posOrigin = getPositionWithOrigin({\\n      x: node.computed?.positionAbsolute?.x ?? 0,\\n      y: node.computed?.positionAbsolute?.y ?? 0,\\n      ...nodeDimesions,\\n      origin: node.origin\\n    })}\\n    <NodeWrapper\\n      {node}\\n      id={node.id}\\n      data={node.data}\\n      selected={!!node.selected}\\n      hidden={!!node.hidden}\\n      draggable={!!(node.draggable || ($nodesDraggable && typeof node.draggable === 'undefined'))}\\n      selectable={!!(\\n        node.selectable ||\\n        ($elementsSelectable && typeof node.selectable === 'undefined')\\n      )}\\n      connectable={!!(\\n        node.connectable ||\\n        ($nodesConnectable && typeof node.connectable === 'undefined')\\n      )}\\n      positionX={node.computed?.positionAbsolute?.x ?? 0}\\n      positionY={node.computed?.positionAbsolute?.y ?? 0}\\n      positionOriginX={posOrigin.x ?? 0}\\n      positionOriginY={posOrigin.y ?? 0}\\n      isParent={!!node[internalsSymbol]?.isParent}\\n      style={node.style}\\n      class={node.class}\\n      type={node.type ?? 'default'}\\n      sourcePosition={node.sourcePosition}\\n      targetPosition={node.targetPosition}\\n      dragging={node.dragging}\\n      zIndex={node[internalsSymbol]?.z ?? 0}\\n      dragHandle={node.dragHandle}\\n      initialized={nodeHasDimensions(node)}\\n      width={node.width}\\n      height={node.height}\\n      initialWidth={node.initialWidth}\\n      initialHeight={node.initialHeight}\\n      computedWidth={node.computed?.width}\\n      computedHeight={node.computed?.height}\\n      {resizeObserver}\\n      on:nodeclick\\n      on:nodemouseenter\\n      on:nodemousemove\\n      on:nodemouseleave\\n      on:nodedrag\\n      on:nodedragstart\\n      on:nodedragstop\\n      on:nodecontextmenu\\n    />\\n  {/each}\\n</div>\\n\\n<style>\\n  .svelte-flow__nodes {\\n    width: 100%;\\n    height: 100%;\\n    position: absolute;\\n    left: 0;\\n    top: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAkFE,iCAAoB,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CACP"}`
};
const NodeRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $visibleNodes, $$unsubscribe_visibleNodes;
  let $nodesDraggable, $$unsubscribe_nodesDraggable;
  let $elementsSelectable, $$unsubscribe_elementsSelectable;
  let $nodesConnectable, $$unsubscribe_nodesConnectable;
  const { visibleNodes, nodesDraggable, nodesConnectable, elementsSelectable, updateNodeDimensions: updateNodeDimensions2 } = useStore();
  $$unsubscribe_visibleNodes = subscribe(visibleNodes, (value) => $visibleNodes = value);
  $$unsubscribe_nodesDraggable = subscribe(nodesDraggable, (value) => $nodesDraggable = value);
  $$unsubscribe_nodesConnectable = subscribe(nodesConnectable, (value) => $nodesConnectable = value);
  $$unsubscribe_elementsSelectable = subscribe(elementsSelectable, (value) => $elementsSelectable = value);
  const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver((entries) => {
    const updates = /* @__PURE__ */ new Map();
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("data-id");
      updates.set(id, {
        id,
        nodeElement: entry.target,
        forceUpdate: true
      });
    });
    updateNodeDimensions2(updates);
  });
  onDestroy(() => {
    resizeObserver?.disconnect();
  });
  $$result.css.add(css$5);
  $$unsubscribe_visibleNodes();
  $$unsubscribe_nodesDraggable();
  $$unsubscribe_elementsSelectable();
  $$unsubscribe_nodesConnectable();
  return `<div class="svelte-flow__nodes svelte-tf4uy4">${each($visibleNodes, (node) => {
    let nodeDimesions = getNodeDimensions(node), posOrigin = getPositionWithOrigin({
      x: node.computed?.positionAbsolute?.x ?? 0,
      y: node.computed?.positionAbsolute?.y ?? 0,
      ...nodeDimesions,
      origin: node.origin
    });
    return `  ${validate_component(NodeWrapper, "NodeWrapper").$$render(
      $$result,
      {
        node,
        id: node.id,
        data: node.data,
        selected: !!node.selected,
        hidden: !!node.hidden,
        draggable: !!(node.draggable || $nodesDraggable && typeof node.draggable === "undefined"),
        selectable: !!(node.selectable || $elementsSelectable && typeof node.selectable === "undefined"),
        connectable: !!(node.connectable || $nodesConnectable && typeof node.connectable === "undefined"),
        positionX: node.computed?.positionAbsolute?.x ?? 0,
        positionY: node.computed?.positionAbsolute?.y ?? 0,
        positionOriginX: posOrigin.x ?? 0,
        positionOriginY: posOrigin.y ?? 0,
        isParent: !!node[internalsSymbol]?.isParent,
        style: node.style,
        class: node.class,
        type: node.type ?? "default",
        sourcePosition: node.sourcePosition,
        targetPosition: node.targetPosition,
        dragging: node.dragging,
        zIndex: node[internalsSymbol]?.z ?? 0,
        dragHandle: node.dragHandle,
        initialized: nodeHasDimensions(node),
        width: node.width,
        height: node.height,
        initialWidth: node.initialWidth,
        initialHeight: node.initialHeight,
        computedWidth: node.computed?.width,
        computedHeight: node.computed?.height,
        resizeObserver
      },
      {},
      {}
    )}`;
  })} </div>`;
});
const EdgeWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let edgeType;
  let edgeComponent;
  let markerStartUrl;
  let markerEndUrl;
  let isSelectable;
  let $$unsubscribe_edgeLookup;
  let $elementsSelectable, $$unsubscribe_elementsSelectable;
  let $flowId, $$unsubscribe_flowId;
  let $edgeTypes, $$unsubscribe_edgeTypes;
  let { id } = $$props;
  let { type = "default" } = $$props;
  let { source = "" } = $$props;
  let { target = "" } = $$props;
  let { data = {} } = $$props;
  let { style = void 0 } = $$props;
  let { zIndex = void 0 } = $$props;
  let { animated = false } = $$props;
  let { selected = false } = $$props;
  let { selectable = void 0 } = $$props;
  let { hidden = false } = $$props;
  let { label = void 0 } = $$props;
  let { labelStyle = void 0 } = $$props;
  let { markerStart = void 0 } = $$props;
  let { markerEnd = void 0 } = $$props;
  let { sourceHandle = void 0 } = $$props;
  let { targetHandle = void 0 } = $$props;
  let { sourceX } = $$props;
  let { sourceY } = $$props;
  let { targetX } = $$props;
  let { targetY } = $$props;
  let { sourcePosition } = $$props;
  let { targetPosition } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { interactionWidth = void 0 } = $$props;
  let { class: className = "" } = $$props;
  setContext("svelteflow__edge_id", id);
  const { edgeLookup, edgeTypes, flowId, elementsSelectable } = useStore();
  $$unsubscribe_edgeLookup = subscribe(edgeLookup, (value) => value);
  $$unsubscribe_edgeTypes = subscribe(edgeTypes, (value) => $edgeTypes = value);
  $$unsubscribe_flowId = subscribe(flowId, (value) => $flowId = value);
  $$unsubscribe_elementsSelectable = subscribe(elementsSelectable, (value) => $elementsSelectable = value);
  createEventDispatcher();
  useHandleEdgeSelect();
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0)
    $$bindings.zIndex(zIndex);
  if ($$props.animated === void 0 && $$bindings.animated && animated !== void 0)
    $$bindings.animated(animated);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.selectable === void 0 && $$bindings.selectable && selectable !== void 0)
    $$bindings.selectable(selectable);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0)
    $$bindings.hidden(hidden);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.labelStyle === void 0 && $$bindings.labelStyle && labelStyle !== void 0)
    $$bindings.labelStyle(labelStyle);
  if ($$props.markerStart === void 0 && $$bindings.markerStart && markerStart !== void 0)
    $$bindings.markerStart(markerStart);
  if ($$props.markerEnd === void 0 && $$bindings.markerEnd && markerEnd !== void 0)
    $$bindings.markerEnd(markerEnd);
  if ($$props.sourceHandle === void 0 && $$bindings.sourceHandle && sourceHandle !== void 0)
    $$bindings.sourceHandle(sourceHandle);
  if ($$props.targetHandle === void 0 && $$bindings.targetHandle && targetHandle !== void 0)
    $$bindings.targetHandle(targetHandle);
  if ($$props.sourceX === void 0 && $$bindings.sourceX && sourceX !== void 0)
    $$bindings.sourceX(sourceX);
  if ($$props.sourceY === void 0 && $$bindings.sourceY && sourceY !== void 0)
    $$bindings.sourceY(sourceY);
  if ($$props.targetX === void 0 && $$bindings.targetX && targetX !== void 0)
    $$bindings.targetX(targetX);
  if ($$props.targetY === void 0 && $$bindings.targetY && targetY !== void 0)
    $$bindings.targetY(targetY);
  if ($$props.sourcePosition === void 0 && $$bindings.sourcePosition && sourcePosition !== void 0)
    $$bindings.sourcePosition(sourcePosition);
  if ($$props.targetPosition === void 0 && $$bindings.targetPosition && targetPosition !== void 0)
    $$bindings.targetPosition(targetPosition);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.interactionWidth === void 0 && $$bindings.interactionWidth && interactionWidth !== void 0)
    $$bindings.interactionWidth(interactionWidth);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  edgeType = type || "default";
  edgeComponent = $edgeTypes[edgeType] || BezierEdgeInternal;
  markerStartUrl = markerStart ? `url(#${getMarkerId(markerStart, $flowId)})` : void 0;
  markerEndUrl = markerEnd ? `url(#${getMarkerId(markerEnd, $flowId)})` : void 0;
  isSelectable = selectable || $elementsSelectable && typeof selectable === "undefined";
  $$unsubscribe_edgeLookup();
  $$unsubscribe_elementsSelectable();
  $$unsubscribe_flowId();
  $$unsubscribe_edgeTypes();
  return `    ${!hidden ? `<svg${add_styles({ "z-index": zIndex })}><g class="${[
    escape(cc(["svelte-flow__edge", className]), true),
    (animated ? "animated" : "") + " " + (selected ? "selected" : "") + " " + (isSelectable ? "selectable" : "")
  ].join(" ").trim()}"${add_attribute("data-id", id, 0)}${add_attribute(
    "aria-label",
    ariaLabel === null ? void 0 : ariaLabel ? ariaLabel : `Edge from ${source} to ${target}`,
    0
  )} role="img">${validate_component(edgeComponent || missing_component, "svelte:component").$$render(
    $$result,
    {
      id,
      source,
      target,
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      animated,
      selected,
      label,
      labelStyle,
      data,
      style,
      interactionWidth,
      type: edgeType,
      sourceHandleId: sourceHandle,
      targetHandleId: targetHandle,
      markerStart: markerStartUrl,
      markerEnd: markerEndUrl
    },
    {},
    {}
  )}</g></svg>` : ``}`;
});
const CallOnMount = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { onMount: _onMount = void 0 } = $$props;
  let { onDestroy: _onDestroy = void 0 } = $$props;
  if ($$props.onMount === void 0 && $$bindings.onMount && _onMount !== void 0)
    $$bindings.onMount(_onMount);
  if ($$props.onDestroy === void 0 && $$bindings.onDestroy && _onDestroy !== void 0)
    $$bindings.onDestroy(_onDestroy);
  return ``;
});
const MarkerDefinition = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $markers, $$unsubscribe_markers;
  const { markers } = useStore();
  $$unsubscribe_markers = subscribe(markers, (value) => $markers = value);
  $$unsubscribe_markers();
  return `<defs>${each($markers, (marker) => {
    return `${validate_component(Marker, "Marker").$$render($$result, Object.assign({}, marker), {}, {})}`;
  })}</defs>`;
});
const Marker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { type } = $$props;
  let { width = 12.5 } = $$props;
  let { height = 12.5 } = $$props;
  let { markerUnits = "strokeWidth" } = $$props;
  let { orient = "auto-start-reverse" } = $$props;
  let { color = void 0 } = $$props;
  let { strokeWidth = void 0 } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.markerUnits === void 0 && $$bindings.markerUnits && markerUnits !== void 0)
    $$bindings.markerUnits(markerUnits);
  if ($$props.orient === void 0 && $$bindings.orient && orient !== void 0)
    $$bindings.orient(orient);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  return `<marker class="svelte-flow__arrowhead"${add_attribute("id", id, 0)}${add_attribute("markerWidth", `${width}`, 0)}${add_attribute("markerHeight", `${height}`, 0)} viewBox="-10 -10 20 20"${add_attribute("markerUnits", markerUnits, 0)}${add_attribute("orient", orient, 0)} refX="0" refY="0">${type === MarkerType.Arrow ? `<polyline${add_attribute("stroke", color, 0)} stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} fill="none" points="-5,-4 0,0 -5,4"></polyline>` : `${type === MarkerType.ArrowClosed ? `<polyline${add_attribute("stroke", color, 0)} stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)}${add_attribute("fill", color, 0)} points="-5,-4 0,0 -5,4 -5,-4"></polyline>` : ``}`}</marker>`;
});
const EdgeRenderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $visibleEdges, $$unsubscribe_visibleEdges;
  let $$unsubscribe_edgesInitialized;
  let { defaultEdgeOptions } = $$props;
  const { visibleEdges, edgesInitialized, edges: { setDefaultOptions } } = useStore();
  $$unsubscribe_visibleEdges = subscribe(visibleEdges, (value) => $visibleEdges = value);
  $$unsubscribe_edgesInitialized = subscribe(edgesInitialized, (value) => value);
  if ($$props.defaultEdgeOptions === void 0 && $$bindings.defaultEdgeOptions && defaultEdgeOptions !== void 0)
    $$bindings.defaultEdgeOptions(defaultEdgeOptions);
  $$unsubscribe_visibleEdges();
  $$unsubscribe_edgesInitialized();
  return `<div class="svelte-flow__edges"><svg class="svelte-flow__marker">${validate_component(MarkerDefinition, "MarkerDefinition").$$render($$result, {}, {}, {})}</svg> ${each($visibleEdges, (edge) => {
    return `${validate_component(EdgeWrapper, "EdgeWrapper").$$render(
      $$result,
      {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        data: edge.data,
        style: edge.style,
        animated: edge.animated,
        selected: edge.selected,
        selectable: edge.selectable,
        hidden: edge.hidden,
        label: edge.label,
        labelStyle: edge.labelStyle,
        markerStart: edge.markerStart,
        markerEnd: edge.markerEnd,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        sourceX: edge.sourceX,
        sourceY: edge.sourceY,
        targetX: edge.targetX,
        targetY: edge.targetY,
        sourcePosition: edge.sourcePosition,
        targetPosition: edge.targetPosition,
        ariaLabel: edge.ariaLabel,
        interactionWidth: edge.interactionWidth,
        class: edge.class,
        type: edge.type || "default",
        zIndex: edge.zIndex
      },
      {},
      {}
    )}`;
  })} ${$visibleEdges.length > 0 ? `${validate_component(CallOnMount, "CallOnMount").$$render(
    $$result,
    {
      onMount: () => {
      },
      onDestroy: () => {
      }
    },
    {},
    {}
  )}` : ``}</div>`;
});
const css$4 = {
  code: ".svelte-flow__selection.svelte-1iugwpu{position:absolute;top:0;left:0}",
  map: '{"version":3,"file":"Selection.svelte","sources":["Selection.svelte"],"sourcesContent":["<script>export let x = 0;\\nexport let y = 0;\\nexport let width = 0;\\nexport let height = 0;\\nexport let isVisible = true;\\n<\/script>\\n\\n{#if isVisible}\\n  <div\\n    class=\\"svelte-flow__selection\\"\\n    style:width={typeof width === \'string\' ? width : `${width}px`}\\n    style:height={typeof height === \'string\' ? height : `${height}px`}\\n    style:transform={`translate(${x}px, ${y}px)`}\\n  />\\n{/if}\\n\\n<style>\\n  .svelte-flow__selection {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAiBE,sCAAwB,CACtB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CACR"}'
};
const Selection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { x = 0 } = $$props;
  let { y = 0 } = $$props;
  let { width = 0 } = $$props;
  let { height = 0 } = $$props;
  let { isVisible = true } = $$props;
  if ($$props.x === void 0 && $$bindings.x && x !== void 0)
    $$bindings.x(x);
  if ($$props.y === void 0 && $$bindings.y && y !== void 0)
    $$bindings.y(y);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.isVisible === void 0 && $$bindings.isVisible && isVisible !== void 0)
    $$bindings.isVisible(isVisible);
  $$result.css.add(css$4);
  return `${isVisible ? `<div class="svelte-flow__selection svelte-1iugwpu"${add_styles({
    "width": typeof width === "string" ? width : `${width}px`,
    "height": typeof height === "string" ? height : `${height}px`,
    "transform": `translate(${x}px, ${y}px)`
  })}></div>` : ``}`;
});
const UserSelection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectionRect, $$unsubscribe_selectionRect;
  let $selectionRectMode, $$unsubscribe_selectionRectMode;
  const { selectionRect, selectionRectMode } = useStore();
  $$unsubscribe_selectionRect = subscribe(selectionRect, (value) => $selectionRect = value);
  $$unsubscribe_selectionRectMode = subscribe(selectionRectMode, (value) => $selectionRectMode = value);
  $$unsubscribe_selectionRect();
  $$unsubscribe_selectionRectMode();
  return `${validate_component(Selection, "Selection").$$render(
    $$result,
    {
      isVisible: !!($selectionRect && $selectionRectMode === "user"),
      width: $selectionRect?.width,
      height: $selectionRect?.height,
      x: $selectionRect?.x,
      y: $selectionRect?.y
    },
    {},
    {}
  )}`;
});
const css$3 = {
  code: ".selection-wrapper.svelte-5pxri{position:absolute;top:0;left:0;z-index:7;pointer-events:all}",
  map: `{"version":3,"file":"NodeSelection.svelte","sources":["NodeSelection.svelte"],"sourcesContent":["<script>import { getNodesBounds } from '@xyflow/system';\\nimport { createEventDispatcher } from 'svelte';\\nimport { useStore } from '../../store';\\nimport { Selection } from '../Selection';\\nimport drag from '../../actions/drag';\\nimport { createNodeEventDispatcher } from '../..';\\nconst store = useStore();\\nconst { selectionRectMode, nodes } = store;\\nconst dispatch = createEventDispatcher();\\nconst dispatchNodeEvent = createNodeEventDispatcher();\\n$: selectedNodes = $nodes.filter((n) => n.selected);\\n$: bounds = getNodesBounds(selectedNodes);\\nfunction onContextMenu(event) {\\n    dispatch('selectioncontextmenu', { nodes: selectedNodes, event });\\n}\\nfunction onClick(event) {\\n    dispatch('selectionclick', { nodes: selectedNodes, event });\\n}\\n<\/script>\\n\\n{#if selectedNodes && $selectionRectMode === 'nodes'}\\n  <div\\n    class=\\"selection-wrapper nopan\\"\\n    style=\\"width: {bounds.width}px; height: {bounds.height}px; transform: translate({bounds.x}px, {bounds.y}px)\\"\\n    use:drag={{\\n      disabled: false,\\n      store,\\n      onDrag: (event, _, __, nodes) => {\\n        dispatchNodeEvent('nodedrag', { event, targetNode: null, nodes });\\n      },\\n      onDragStart: (event, _, __, nodes) => {\\n        dispatchNodeEvent('nodedragstart', { event, targetNode: null, nodes });\\n      },\\n      onDragStop: (event, _, __, nodes) => {\\n        dispatchNodeEvent('nodedragstop', { event, targetNode: null, nodes });\\n      }\\n    }}\\n    on:contextmenu={onContextMenu}\\n    on:click={onClick}\\n    role=\\"button\\"\\n    tabindex=\\"-1\\"\\n    on:keyup={() => {}}\\n  >\\n    <Selection width=\\"100%\\" height=\\"100%\\" x={0} y={0} />\\n  </div>\\n{/if}\\n\\n<style>\\n  .selection-wrapper {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    z-index: 7;\\n    pointer-events: all;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAgDE,+BAAmB,CACjB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,GAClB"}`
};
const NodeSelection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedNodes;
  let bounds;
  let $nodes, $$unsubscribe_nodes;
  let $selectionRectMode, $$unsubscribe_selectionRectMode;
  const store = useStore();
  const { selectionRectMode, nodes } = store;
  $$unsubscribe_selectionRectMode = subscribe(selectionRectMode, (value) => $selectionRectMode = value);
  $$unsubscribe_nodes = subscribe(nodes, (value) => $nodes = value);
  createEventDispatcher();
  createNodeEventDispatcher();
  $$result.css.add(css$3);
  selectedNodes = $nodes.filter((n) => n.selected);
  bounds = getNodesBounds(selectedNodes);
  $$unsubscribe_nodes();
  $$unsubscribe_selectionRectMode();
  return `${selectedNodes && $selectionRectMode === "nodes" ? `<div class="selection-wrapper nopan svelte-5pxri" style="${"width: " + escape(bounds.width, true) + "px; height: " + escape(bounds.height, true) + "px; transform: translate(" + escape(bounds.x, true) + "px, " + escape(bounds.y, true) + "px)"}" role="button" tabindex="-1">${validate_component(Selection, "Selection").$$render(
    $$result,
    {
      width: "100%",
      height: "100%",
      x: 0,
      y: 0
    },
    {},
    {}
  )}</div>` : ``}`;
});
const KeyHandler = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectionKey = "Shift" } = $$props;
  let { multiSelectionKey = isMacOs() ? "Meta" : "Control" } = $$props;
  let { deleteKey = "Backspace" } = $$props;
  let { panActivationKey = " " } = $$props;
  let { zoomActivationKey = isMacOs() ? "Meta" : "Control" } = $$props;
  useStore();
  if ($$props.selectionKey === void 0 && $$bindings.selectionKey && selectionKey !== void 0)
    $$bindings.selectionKey(selectionKey);
  if ($$props.multiSelectionKey === void 0 && $$bindings.multiSelectionKey && multiSelectionKey !== void 0)
    $$bindings.multiSelectionKey(multiSelectionKey);
  if ($$props.deleteKey === void 0 && $$bindings.deleteKey && deleteKey !== void 0)
    $$bindings.deleteKey(deleteKey);
  if ($$props.panActivationKey === void 0 && $$bindings.panActivationKey && panActivationKey !== void 0)
    $$bindings.panActivationKey(panActivationKey);
  if ($$props.zoomActivationKey === void 0 && $$bindings.zoomActivationKey && zoomActivationKey !== void 0)
    $$bindings.zoomActivationKey(zoomActivationKey);
  return ``;
});
const ConnectionLine = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $connection, $$unsubscribe_connection;
  let $width, $$unsubscribe_width;
  let $height, $$unsubscribe_height;
  let { containerStyle = "" } = $$props;
  let { style = "" } = $$props;
  let { isCustomComponent = false } = $$props;
  const { width, height, connection } = useStore();
  $$unsubscribe_width = subscribe(width, (value) => $width = value);
  $$unsubscribe_height = subscribe(height, (value) => $height = value);
  $$unsubscribe_connection = subscribe(connection, (value) => $connection = value);
  if ($$props.containerStyle === void 0 && $$bindings.containerStyle && containerStyle !== void 0)
    $$bindings.containerStyle(containerStyle);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.isCustomComponent === void 0 && $$bindings.isCustomComponent && isCustomComponent !== void 0)
    $$bindings.isCustomComponent(isCustomComponent);
  $$unsubscribe_connection();
  $$unsubscribe_width();
  $$unsubscribe_height();
  return `${$connection.path ? `<svg${add_attribute("width", $width, 0)}${add_attribute("height", $height, 0)} class="svelte-flow__connectionline"${add_attribute("style", containerStyle, 0)}><g${add_attribute("class", cc(["svelte-flow__connection", $connection.status]), 0)}>${slots.connectionLine ? slots.connectionLine({}) : ``}${!isCustomComponent ? `<path${add_attribute("d", $connection.path, 0)}${add_attribute("style", style, 0)} fill="none" class="svelte-flow__connection-path"></path>` : ``}</g></svg>` : ``}`;
});
const Panel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let positionClasses;
  let $$restProps = compute_rest_props($$props, ["position", "style", "class"]);
  let { position = "top-right" } = $$props;
  let { style = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  positionClasses = `${position}`.split("-");
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cc(["svelte-flow__panel", className, ...positionClasses]))
      },
      { style: escape_attribute_value(style) },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Attribution = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { proOptions = void 0 } = $$props;
  let { position = "bottom-right" } = $$props;
  if ($$props.proOptions === void 0 && $$bindings.proOptions && proOptions !== void 0)
    $$bindings.proOptions(proOptions);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  return `${!proOptions?.hideAttribution ? `${validate_component(Panel, "Panel").$$render(
    $$result,
    {
      position,
      class: "svelte-flow__attribution",
      "data-message": "Feel free to remove the attribution or check out how you could support us: https://svelteflow.dev/support-us"
    },
    {},
    {
      default: () => {
        return `<a href="https://svelteflow.dev" target="_blank" rel="noopener noreferrer" aria-label="Svelte Flow attribution" data-svelte-h="svelte-2vm8e4">Svelte Flow</a>`;
      }
    }
  )}` : ``}`;
});
function updateStore(store, { nodeTypes, edgeTypes, minZoom, maxZoom, translateExtent }) {
  if (nodeTypes !== void 0) {
    store.setNodeTypes(nodeTypes);
  }
  if (edgeTypes !== void 0) {
    store.setEdgeTypes(edgeTypes);
  }
  if (minZoom !== void 0) {
    store.setMinZoom(minZoom);
  }
  if (maxZoom !== void 0) {
    store.setMaxZoom(maxZoom);
  }
  if (translateExtent !== void 0) {
    store.setTranslateExtent(translateExtent);
  }
}
const getKeys = (obj) => Object.keys(obj);
function updateStoreByKeys(store, keys) {
  getKeys(keys).forEach((prop) => {
    const update = keys[prop];
    if (update !== void 0) {
      store[prop].set(update);
    }
  });
}
function getMediaQuery() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return null;
  }
  return window.matchMedia("(prefers-color-scheme: dark)");
}
function useColorModeClass(colorMode = "light") {
  const colorModeClass = readable("light", (set) => {
    if (colorMode !== "system") {
      set(colorMode);
      return;
    }
    const mediaQuery = getMediaQuery();
    const updateColorModeClass = () => set(mediaQuery?.matches ? "dark" : "light");
    set(mediaQuery?.matches ? "dark" : "light");
    mediaQuery?.addEventListener("change", updateColorModeClass);
    return () => {
      mediaQuery?.removeEventListener("change", updateColorModeClass);
    };
  });
  return colorModeClass;
}
const css$2 = {
  code: ".svelte-flow.svelte-12wlba6{width:100%;height:100%;overflow:hidden;position:relative;z-index:0;background-color:var(--background-color, var(--background-color-default))}:root{--background-color-default:#fff;--background-pattern-color-default:#ddd;--minimap-mask-color-default:rgb(240, 240, 240, 0.6);--minimap-mask-stroke-color-default:none;--minimap-mask-stroke-width-default:1;--controls-button-background-color-default:#fefefe;--controls-button-background-color-hover-default:#f4f4f4;--controls-button-color-default:inherit;--controls-button-color-hover-default:inherit;--controls-button-border-color-default:#eee}",
  map: `{"version":3,"file":"SvelteFlow.svelte","sources":["SvelteFlow.svelte"],"sourcesContent":["<script>import { onMount, hasContext } from 'svelte';\\nimport { get } from 'svelte/store';\\nimport cc from 'classcat';\\nimport { ConnectionMode, PanOnScrollMode } from '@xyflow/system';\\nimport { Zoom } from '../Zoom';\\nimport { Pane } from '../Pane';\\nimport { Viewport as ViewportComponent } from '../Viewport';\\nimport { NodeRenderer } from '../NodeRenderer';\\nimport { EdgeRenderer } from '../EdgeRenderer';\\nimport { UserSelection } from '../../components/UserSelection';\\nimport { NodeSelection } from '../../components/NodeSelection';\\nimport { KeyHandler } from '../../components/KeyHandler';\\nimport { ConnectionLine } from '../../components/ConnectionLine';\\nimport { Attribution } from '../../components/Attribution';\\nimport { key, useStore, createStoreContext } from '../../store';\\nimport { updateStore, updateStoreByKeys } from './utils';\\nimport { useColorModeClass } from '../../hooks/useColorModeClass';\\nexport let id = '1';\\nexport let nodes;\\nexport let edges;\\nexport let fitView = undefined;\\nexport let fitViewOptions = undefined;\\nexport let minZoom = undefined;\\nexport let maxZoom = undefined;\\nexport let initialViewport = { x: 0, y: 0, zoom: 1 };\\nexport let viewport = undefined;\\nexport let nodeTypes = undefined;\\nexport let edgeTypes = undefined;\\nexport let selectionKey = undefined;\\nexport let selectionMode = undefined;\\nexport let panActivationKey = undefined;\\nexport let multiSelectionKey = undefined;\\nexport let zoomActivationKey = undefined;\\nexport let nodesDraggable = undefined;\\nexport let nodesConnectable = undefined;\\nexport let nodeDragThreshold = undefined;\\nexport let elementsSelectable = undefined;\\nexport let snapGrid = undefined;\\nexport let deleteKey = undefined;\\nexport let connectionRadius = undefined;\\nexport let connectionLineType = undefined;\\nexport let connectionMode = ConnectionMode.Strict;\\nexport let connectionLineStyle = '';\\nexport let connectionLineContainerStyle = '';\\nexport let onMoveStart = undefined;\\nexport let onMove = undefined;\\nexport let onMoveEnd = undefined;\\nexport let isValidConnection = undefined;\\nexport let translateExtent = undefined;\\nexport let onlyRenderVisibleElements = undefined;\\nexport let panOnScrollMode = PanOnScrollMode.Free;\\nexport let preventScrolling = true;\\nexport let zoomOnScroll = true;\\nexport let zoomOnDoubleClick = true;\\nexport let zoomOnPinch = true;\\nexport let panOnScroll = false;\\nexport let panOnDrag = true;\\nexport let selectionOnDrag = undefined;\\nexport let autoPanOnConnect = true;\\nexport let autoPanOnNodeDrag = true;\\nexport let onerror = undefined;\\nexport let ondelete = undefined;\\nexport let onedgecreate = undefined;\\nexport let attributionPosition = undefined;\\nexport let proOptions = undefined;\\nexport let defaultEdgeOptions = undefined;\\nexport let width = undefined;\\nexport let height = undefined;\\nexport let colorMode = 'light';\\nexport let onconnect = undefined;\\nexport let onconnectstart = undefined;\\nexport let onconnectend = undefined;\\nexport let onbeforedelete = undefined;\\nexport let oninit = undefined;\\nexport let defaultMarkerColor = '#b1b1b7';\\nexport let style = undefined;\\nlet className = undefined;\\nexport { className as class };\\nlet domNode;\\nlet clientWidth;\\nlet clientHeight;\\nconst store = hasContext(key)\\n    ? useStore()\\n    : createStoreContext({ nodes: get(nodes), edges: get(edges), width, height, fitView });\\nonMount(() => {\\n    store.width.set(clientWidth);\\n    store.height.set(clientHeight);\\n    store.domNode.set(domNode);\\n    store.syncNodeStores(nodes);\\n    store.syncEdgeStores(edges);\\n    store.syncViewport(viewport);\\n    if (fitView !== undefined) {\\n        store.fitViewOnInit.set(fitView);\\n    }\\n    if (fitViewOptions) {\\n        store.fitViewOptions.set(fitViewOptions);\\n    }\\n    updateStore(store, {\\n        nodeTypes,\\n        edgeTypes,\\n        minZoom,\\n        maxZoom,\\n        translateExtent\\n    });\\n    return () => {\\n        store.reset();\\n    };\\n});\\n// Update width & height on resize\\n$: {\\n    if (clientWidth !== undefined && clientHeight !== undefined) {\\n        store.width.set(clientWidth);\\n        store.height.set(clientHeight);\\n    }\\n}\\n// Call oninit once when flow is intialized\\nconst { initialized } = store;\\nlet onInitCalled = false;\\n$: {\\n    if (!onInitCalled && $initialized) {\\n        oninit?.();\\n        onInitCalled = true;\\n    }\\n}\\n// this updates the store for simple changes\\n// where the prop names equals the store name\\n$: {\\n    const updatableProps = {\\n        flowId: id,\\n        connectionLineType,\\n        connectionRadius,\\n        selectionMode,\\n        snapGrid,\\n        defaultMarkerColor,\\n        nodesDraggable,\\n        nodesConnectable,\\n        elementsSelectable,\\n        onlyRenderVisibleElements,\\n        isValidConnection,\\n        autoPanOnConnect,\\n        autoPanOnNodeDrag,\\n        onerror,\\n        ondelete,\\n        onedgecreate,\\n        connectionMode,\\n        nodeDragThreshold,\\n        onconnect,\\n        onconnectstart,\\n        onconnectend,\\n        onbeforedelete\\n    };\\n    updateStoreByKeys(store, updatableProps);\\n}\\n$: updateStore(store, {\\n    nodeTypes,\\n    edgeTypes,\\n    minZoom,\\n    maxZoom,\\n    translateExtent\\n});\\n$: colorModeClass = useColorModeClass(colorMode);\\n<\/script>\\n\\n<div\\n  bind:this={domNode}\\n  bind:clientWidth\\n  bind:clientHeight\\n  {style}\\n  class={cc(['svelte-flow', className, $colorModeClass])}\\n  data-testid=\\"svelte-flow__wrapper\\"\\n  on:dragover\\n  on:drop\\n  {...$$restProps}\\n  role=\\"application\\"\\n>\\n  <KeyHandler\\n    {selectionKey}\\n    {deleteKey}\\n    {panActivationKey}\\n    {multiSelectionKey}\\n    {zoomActivationKey}\\n  />\\n  <Zoom\\n    {initialViewport}\\n    {onMoveStart}\\n    {onMove}\\n    {onMoveEnd}\\n    panOnScrollMode={panOnScrollMode === undefined ? PanOnScrollMode.Free : panOnScrollMode}\\n    preventScrolling={preventScrolling === undefined ? true : preventScrolling}\\n    zoomOnScroll={zoomOnScroll === undefined ? true : zoomOnScroll}\\n    zoomOnDoubleClick={zoomOnDoubleClick === undefined ? true : zoomOnDoubleClick}\\n    zoomOnPinch={zoomOnPinch === undefined ? true : zoomOnPinch}\\n    panOnScroll={panOnScroll === undefined ? false : panOnScroll}\\n    panOnDrag={panOnDrag === undefined ? true : panOnDrag}\\n  >\\n    <Pane\\n      on:paneclick\\n      on:panecontextmenu\\n      panOnDrag={panOnDrag === undefined ? true : panOnDrag}\\n      {selectionOnDrag}\\n    >\\n      <ViewportComponent>\\n        <EdgeRenderer on:edgeclick on:edgecontextmenu {defaultEdgeOptions} />\\n        <ConnectionLine\\n          containerStyle={connectionLineContainerStyle}\\n          style={connectionLineStyle}\\n          isCustomComponent={$$slots.connectionLine}\\n        >\\n          <slot name=\\"connectionLine\\" slot=\\"connectionLine\\" />\\n        </ConnectionLine>\\n        <div class=\\"svelte-flow__edgelabel-renderer\\" />\\n        <div class=\\"svelte-flow__viewport-portal\\" />\\n        <NodeRenderer\\n          on:nodeclick\\n          on:nodemouseenter\\n          on:nodemousemove\\n          on:nodemouseleave\\n          on:nodedragstart\\n          on:nodedrag\\n          on:nodedragstop\\n          on:nodecontextmenu\\n        />\\n        <NodeSelection\\n          on:selectionclick\\n          on:selectioncontextmenu\\n          on:nodedragstart\\n          on:nodedrag\\n          on:nodedragstop\\n        />\\n      </ViewportComponent>\\n      <UserSelection />\\n    </Pane>\\n  </Zoom>\\n  <Attribution {proOptions} position={attributionPosition} />\\n  <slot />\\n</div>\\n\\n<style>\\n  .svelte-flow {\\n    width: 100%;\\n    height: 100%;\\n    overflow: hidden;\\n    position: relative;\\n    z-index: 0;\\n\\n    background-color: var(--background-color, var(--background-color-default));\\n  }\\n\\n  :root {\\n    --background-color-default: #fff;\\n    --background-pattern-color-default: #ddd;\\n\\n    --minimap-mask-color-default: rgb(240, 240, 240, 0.6);\\n    --minimap-mask-stroke-color-default: none;\\n    --minimap-mask-stroke-width-default: 1;\\n\\n    --controls-button-background-color-default: #fefefe;\\n    --controls-button-background-color-hover-default: #f4f4f4;\\n    --controls-button-color-default: inherit;\\n    --controls-button-color-hover-default: inherit;\\n    --controls-button-border-color-default: #eee;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA8OE,2BAAa,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CAEV,gBAAgB,CAAE,IAAI,kBAAkB,CAAC,gCAAgC,CAC3E,CAEA,KAAM,CACJ,0BAA0B,CAAE,IAAI,CAChC,kCAAkC,CAAE,IAAI,CAExC,4BAA4B,CAAE,uBAAuB,CACrD,mCAAmC,CAAE,IAAI,CACzC,mCAAmC,CAAE,CAAC,CAEtC,0CAA0C,CAAE,OAAO,CACnD,gDAAgD,CAAE,OAAO,CACzD,+BAA+B,CAAE,OAAO,CACxC,qCAAqC,CAAE,OAAO,CAC9C,sCAAsC,CAAE,IAC1C"}`
};
const SvelteFlow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let colorModeClass;
  let $$restProps = compute_rest_props($$props, [
    "id",
    "nodes",
    "edges",
    "fitView",
    "fitViewOptions",
    "minZoom",
    "maxZoom",
    "initialViewport",
    "viewport",
    "nodeTypes",
    "edgeTypes",
    "selectionKey",
    "selectionMode",
    "panActivationKey",
    "multiSelectionKey",
    "zoomActivationKey",
    "nodesDraggable",
    "nodesConnectable",
    "nodeDragThreshold",
    "elementsSelectable",
    "snapGrid",
    "deleteKey",
    "connectionRadius",
    "connectionLineType",
    "connectionMode",
    "connectionLineStyle",
    "connectionLineContainerStyle",
    "onMoveStart",
    "onMove",
    "onMoveEnd",
    "isValidConnection",
    "translateExtent",
    "onlyRenderVisibleElements",
    "panOnScrollMode",
    "preventScrolling",
    "zoomOnScroll",
    "zoomOnDoubleClick",
    "zoomOnPinch",
    "panOnScroll",
    "panOnDrag",
    "selectionOnDrag",
    "autoPanOnConnect",
    "autoPanOnNodeDrag",
    "onerror",
    "ondelete",
    "onedgecreate",
    "attributionPosition",
    "proOptions",
    "defaultEdgeOptions",
    "width",
    "height",
    "colorMode",
    "onconnect",
    "onconnectstart",
    "onconnectend",
    "onbeforedelete",
    "oninit",
    "defaultMarkerColor",
    "style",
    "class"
  ]);
  let $$slots = compute_slots(slots);
  let $initialized, $$unsubscribe_initialized;
  let $colorModeClass, $$unsubscribe_colorModeClass = noop, $$subscribe_colorModeClass = () => ($$unsubscribe_colorModeClass(), $$unsubscribe_colorModeClass = subscribe(colorModeClass, ($$value) => $colorModeClass = $$value), colorModeClass);
  let { id = "1" } = $$props;
  let { nodes } = $$props;
  let { edges } = $$props;
  let { fitView: fitView2 = void 0 } = $$props;
  let { fitViewOptions = void 0 } = $$props;
  let { minZoom = void 0 } = $$props;
  let { maxZoom = void 0 } = $$props;
  let { initialViewport = { x: 0, y: 0, zoom: 1 } } = $$props;
  let { viewport = void 0 } = $$props;
  let { nodeTypes = void 0 } = $$props;
  let { edgeTypes = void 0 } = $$props;
  let { selectionKey = void 0 } = $$props;
  let { selectionMode = void 0 } = $$props;
  let { panActivationKey = void 0 } = $$props;
  let { multiSelectionKey = void 0 } = $$props;
  let { zoomActivationKey = void 0 } = $$props;
  let { nodesDraggable = void 0 } = $$props;
  let { nodesConnectable = void 0 } = $$props;
  let { nodeDragThreshold = void 0 } = $$props;
  let { elementsSelectable = void 0 } = $$props;
  let { snapGrid = void 0 } = $$props;
  let { deleteKey = void 0 } = $$props;
  let { connectionRadius = void 0 } = $$props;
  let { connectionLineType = void 0 } = $$props;
  let { connectionMode = ConnectionMode.Strict } = $$props;
  let { connectionLineStyle = "" } = $$props;
  let { connectionLineContainerStyle = "" } = $$props;
  let { onMoveStart = void 0 } = $$props;
  let { onMove = void 0 } = $$props;
  let { onMoveEnd = void 0 } = $$props;
  let { isValidConnection = void 0 } = $$props;
  let { translateExtent = void 0 } = $$props;
  let { onlyRenderVisibleElements = void 0 } = $$props;
  let { panOnScrollMode = PanOnScrollMode.Free } = $$props;
  let { preventScrolling = true } = $$props;
  let { zoomOnScroll = true } = $$props;
  let { zoomOnDoubleClick = true } = $$props;
  let { zoomOnPinch = true } = $$props;
  let { panOnScroll = false } = $$props;
  let { panOnDrag = true } = $$props;
  let { selectionOnDrag = void 0 } = $$props;
  let { autoPanOnConnect = true } = $$props;
  let { autoPanOnNodeDrag = true } = $$props;
  let { onerror = void 0 } = $$props;
  let { ondelete = void 0 } = $$props;
  let { onedgecreate = void 0 } = $$props;
  let { attributionPosition = void 0 } = $$props;
  let { proOptions = void 0 } = $$props;
  let { defaultEdgeOptions = void 0 } = $$props;
  let { width = void 0 } = $$props;
  let { height = void 0 } = $$props;
  let { colorMode = "light" } = $$props;
  let { onconnect = void 0 } = $$props;
  let { onconnectstart = void 0 } = $$props;
  let { onconnectend = void 0 } = $$props;
  let { onbeforedelete = void 0 } = $$props;
  let { oninit = void 0 } = $$props;
  let { defaultMarkerColor = "#b1b1b7" } = $$props;
  let { style = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  let domNode;
  const store = hasContext(key) ? useStore() : createStoreContext({
    nodes: get_store_value(nodes),
    edges: get_store_value(edges),
    width,
    height,
    fitView: fitView2
  });
  const { initialized } = store;
  $$unsubscribe_initialized = subscribe(initialized, (value) => $initialized = value);
  let onInitCalled = false;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.nodes === void 0 && $$bindings.nodes && nodes !== void 0)
    $$bindings.nodes(nodes);
  if ($$props.edges === void 0 && $$bindings.edges && edges !== void 0)
    $$bindings.edges(edges);
  if ($$props.fitView === void 0 && $$bindings.fitView && fitView2 !== void 0)
    $$bindings.fitView(fitView2);
  if ($$props.fitViewOptions === void 0 && $$bindings.fitViewOptions && fitViewOptions !== void 0)
    $$bindings.fitViewOptions(fitViewOptions);
  if ($$props.minZoom === void 0 && $$bindings.minZoom && minZoom !== void 0)
    $$bindings.minZoom(minZoom);
  if ($$props.maxZoom === void 0 && $$bindings.maxZoom && maxZoom !== void 0)
    $$bindings.maxZoom(maxZoom);
  if ($$props.initialViewport === void 0 && $$bindings.initialViewport && initialViewport !== void 0)
    $$bindings.initialViewport(initialViewport);
  if ($$props.viewport === void 0 && $$bindings.viewport && viewport !== void 0)
    $$bindings.viewport(viewport);
  if ($$props.nodeTypes === void 0 && $$bindings.nodeTypes && nodeTypes !== void 0)
    $$bindings.nodeTypes(nodeTypes);
  if ($$props.edgeTypes === void 0 && $$bindings.edgeTypes && edgeTypes !== void 0)
    $$bindings.edgeTypes(edgeTypes);
  if ($$props.selectionKey === void 0 && $$bindings.selectionKey && selectionKey !== void 0)
    $$bindings.selectionKey(selectionKey);
  if ($$props.selectionMode === void 0 && $$bindings.selectionMode && selectionMode !== void 0)
    $$bindings.selectionMode(selectionMode);
  if ($$props.panActivationKey === void 0 && $$bindings.panActivationKey && panActivationKey !== void 0)
    $$bindings.panActivationKey(panActivationKey);
  if ($$props.multiSelectionKey === void 0 && $$bindings.multiSelectionKey && multiSelectionKey !== void 0)
    $$bindings.multiSelectionKey(multiSelectionKey);
  if ($$props.zoomActivationKey === void 0 && $$bindings.zoomActivationKey && zoomActivationKey !== void 0)
    $$bindings.zoomActivationKey(zoomActivationKey);
  if ($$props.nodesDraggable === void 0 && $$bindings.nodesDraggable && nodesDraggable !== void 0)
    $$bindings.nodesDraggable(nodesDraggable);
  if ($$props.nodesConnectable === void 0 && $$bindings.nodesConnectable && nodesConnectable !== void 0)
    $$bindings.nodesConnectable(nodesConnectable);
  if ($$props.nodeDragThreshold === void 0 && $$bindings.nodeDragThreshold && nodeDragThreshold !== void 0)
    $$bindings.nodeDragThreshold(nodeDragThreshold);
  if ($$props.elementsSelectable === void 0 && $$bindings.elementsSelectable && elementsSelectable !== void 0)
    $$bindings.elementsSelectable(elementsSelectable);
  if ($$props.snapGrid === void 0 && $$bindings.snapGrid && snapGrid !== void 0)
    $$bindings.snapGrid(snapGrid);
  if ($$props.deleteKey === void 0 && $$bindings.deleteKey && deleteKey !== void 0)
    $$bindings.deleteKey(deleteKey);
  if ($$props.connectionRadius === void 0 && $$bindings.connectionRadius && connectionRadius !== void 0)
    $$bindings.connectionRadius(connectionRadius);
  if ($$props.connectionLineType === void 0 && $$bindings.connectionLineType && connectionLineType !== void 0)
    $$bindings.connectionLineType(connectionLineType);
  if ($$props.connectionMode === void 0 && $$bindings.connectionMode && connectionMode !== void 0)
    $$bindings.connectionMode(connectionMode);
  if ($$props.connectionLineStyle === void 0 && $$bindings.connectionLineStyle && connectionLineStyle !== void 0)
    $$bindings.connectionLineStyle(connectionLineStyle);
  if ($$props.connectionLineContainerStyle === void 0 && $$bindings.connectionLineContainerStyle && connectionLineContainerStyle !== void 0)
    $$bindings.connectionLineContainerStyle(connectionLineContainerStyle);
  if ($$props.onMoveStart === void 0 && $$bindings.onMoveStart && onMoveStart !== void 0)
    $$bindings.onMoveStart(onMoveStart);
  if ($$props.onMove === void 0 && $$bindings.onMove && onMove !== void 0)
    $$bindings.onMove(onMove);
  if ($$props.onMoveEnd === void 0 && $$bindings.onMoveEnd && onMoveEnd !== void 0)
    $$bindings.onMoveEnd(onMoveEnd);
  if ($$props.isValidConnection === void 0 && $$bindings.isValidConnection && isValidConnection !== void 0)
    $$bindings.isValidConnection(isValidConnection);
  if ($$props.translateExtent === void 0 && $$bindings.translateExtent && translateExtent !== void 0)
    $$bindings.translateExtent(translateExtent);
  if ($$props.onlyRenderVisibleElements === void 0 && $$bindings.onlyRenderVisibleElements && onlyRenderVisibleElements !== void 0)
    $$bindings.onlyRenderVisibleElements(onlyRenderVisibleElements);
  if ($$props.panOnScrollMode === void 0 && $$bindings.panOnScrollMode && panOnScrollMode !== void 0)
    $$bindings.panOnScrollMode(panOnScrollMode);
  if ($$props.preventScrolling === void 0 && $$bindings.preventScrolling && preventScrolling !== void 0)
    $$bindings.preventScrolling(preventScrolling);
  if ($$props.zoomOnScroll === void 0 && $$bindings.zoomOnScroll && zoomOnScroll !== void 0)
    $$bindings.zoomOnScroll(zoomOnScroll);
  if ($$props.zoomOnDoubleClick === void 0 && $$bindings.zoomOnDoubleClick && zoomOnDoubleClick !== void 0)
    $$bindings.zoomOnDoubleClick(zoomOnDoubleClick);
  if ($$props.zoomOnPinch === void 0 && $$bindings.zoomOnPinch && zoomOnPinch !== void 0)
    $$bindings.zoomOnPinch(zoomOnPinch);
  if ($$props.panOnScroll === void 0 && $$bindings.panOnScroll && panOnScroll !== void 0)
    $$bindings.panOnScroll(panOnScroll);
  if ($$props.panOnDrag === void 0 && $$bindings.panOnDrag && panOnDrag !== void 0)
    $$bindings.panOnDrag(panOnDrag);
  if ($$props.selectionOnDrag === void 0 && $$bindings.selectionOnDrag && selectionOnDrag !== void 0)
    $$bindings.selectionOnDrag(selectionOnDrag);
  if ($$props.autoPanOnConnect === void 0 && $$bindings.autoPanOnConnect && autoPanOnConnect !== void 0)
    $$bindings.autoPanOnConnect(autoPanOnConnect);
  if ($$props.autoPanOnNodeDrag === void 0 && $$bindings.autoPanOnNodeDrag && autoPanOnNodeDrag !== void 0)
    $$bindings.autoPanOnNodeDrag(autoPanOnNodeDrag);
  if ($$props.onerror === void 0 && $$bindings.onerror && onerror !== void 0)
    $$bindings.onerror(onerror);
  if ($$props.ondelete === void 0 && $$bindings.ondelete && ondelete !== void 0)
    $$bindings.ondelete(ondelete);
  if ($$props.onedgecreate === void 0 && $$bindings.onedgecreate && onedgecreate !== void 0)
    $$bindings.onedgecreate(onedgecreate);
  if ($$props.attributionPosition === void 0 && $$bindings.attributionPosition && attributionPosition !== void 0)
    $$bindings.attributionPosition(attributionPosition);
  if ($$props.proOptions === void 0 && $$bindings.proOptions && proOptions !== void 0)
    $$bindings.proOptions(proOptions);
  if ($$props.defaultEdgeOptions === void 0 && $$bindings.defaultEdgeOptions && defaultEdgeOptions !== void 0)
    $$bindings.defaultEdgeOptions(defaultEdgeOptions);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.colorMode === void 0 && $$bindings.colorMode && colorMode !== void 0)
    $$bindings.colorMode(colorMode);
  if ($$props.onconnect === void 0 && $$bindings.onconnect && onconnect !== void 0)
    $$bindings.onconnect(onconnect);
  if ($$props.onconnectstart === void 0 && $$bindings.onconnectstart && onconnectstart !== void 0)
    $$bindings.onconnectstart(onconnectstart);
  if ($$props.onconnectend === void 0 && $$bindings.onconnectend && onconnectend !== void 0)
    $$bindings.onconnectend(onconnectend);
  if ($$props.onbeforedelete === void 0 && $$bindings.onbeforedelete && onbeforedelete !== void 0)
    $$bindings.onbeforedelete(onbeforedelete);
  if ($$props.oninit === void 0 && $$bindings.oninit && oninit !== void 0)
    $$bindings.oninit(oninit);
  if ($$props.defaultMarkerColor === void 0 && $$bindings.defaultMarkerColor && defaultMarkerColor !== void 0)
    $$bindings.defaultMarkerColor(defaultMarkerColor);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$result.css.add(css$2);
  {
    {
      if (!onInitCalled && $initialized) {
        oninit?.();
        onInitCalled = true;
      }
    }
  }
  {
    {
      const updatableProps = {
        flowId: id,
        connectionLineType,
        connectionRadius,
        selectionMode,
        snapGrid,
        defaultMarkerColor,
        nodesDraggable,
        nodesConnectable,
        elementsSelectable,
        onlyRenderVisibleElements,
        isValidConnection,
        autoPanOnConnect,
        autoPanOnNodeDrag,
        onerror,
        ondelete,
        onedgecreate,
        connectionMode,
        nodeDragThreshold,
        onconnect,
        onconnectstart,
        onconnectend,
        onbeforedelete
      };
      updateStoreByKeys(store, updatableProps);
    }
  }
  {
    updateStore(store, {
      nodeTypes,
      edgeTypes,
      minZoom,
      maxZoom,
      translateExtent
    });
  }
  $$subscribe_colorModeClass(colorModeClass = useColorModeClass(colorMode));
  $$unsubscribe_initialized();
  $$unsubscribe_colorModeClass();
  return `<div${spread(
    [
      { style: escape_attribute_value(style) },
      {
        class: escape_attribute_value(cc(["svelte-flow", className, $colorModeClass]))
      },
      { "data-testid": "svelte-flow__wrapper" },
      escape_object($$restProps),
      { role: "application" }
    ],
    { classes: "svelte-12wlba6" }
  )}${add_attribute("this", domNode, 0)}>${validate_component(KeyHandler, "KeyHandler").$$render(
    $$result,
    {
      selectionKey,
      deleteKey,
      panActivationKey,
      multiSelectionKey,
      zoomActivationKey
    },
    {},
    {}
  )} ${validate_component(Zoom, "Zoom").$$render(
    $$result,
    {
      initialViewport,
      onMoveStart,
      onMove,
      onMoveEnd,
      panOnScrollMode: panOnScrollMode === void 0 ? PanOnScrollMode.Free : panOnScrollMode,
      preventScrolling: preventScrolling === void 0 ? true : preventScrolling,
      zoomOnScroll: zoomOnScroll === void 0 ? true : zoomOnScroll,
      zoomOnDoubleClick: zoomOnDoubleClick === void 0 ? true : zoomOnDoubleClick,
      zoomOnPinch: zoomOnPinch === void 0 ? true : zoomOnPinch,
      panOnScroll: panOnScroll === void 0 ? false : panOnScroll,
      panOnDrag: panOnDrag === void 0 ? true : panOnDrag
    },
    {},
    {
      default: () => {
        return `${validate_component(Pane, "Pane").$$render(
          $$result,
          {
            panOnDrag: panOnDrag === void 0 ? true : panOnDrag,
            selectionOnDrag
          },
          {},
          {
            default: () => {
              return `${validate_component(Viewport, "ViewportComponent").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(EdgeRenderer, "EdgeRenderer").$$render($$result, { defaultEdgeOptions }, {}, {})} ${validate_component(ConnectionLine, "ConnectionLine").$$render(
                    $$result,
                    {
                      containerStyle: connectionLineContainerStyle,
                      style: connectionLineStyle,
                      isCustomComponent: $$slots.connectionLine
                    },
                    {},
                    {
                      connectionLine: () => {
                        return `${slots.connectionLine ? slots.connectionLine({ slot: "connectionLine" }) : ``}`;
                      }
                    }
                  )} <div class="svelte-flow__edgelabel-renderer"></div> <div class="svelte-flow__viewport-portal"></div> ${validate_component(NodeRenderer, "NodeRenderer").$$render($$result, {}, {}, {})} ${validate_component(NodeSelection, "NodeSelection").$$render($$result, {}, {}, {})}`;
                }
              })} ${validate_component(UserSelection, "UserSelection").$$render($$result, {}, {}, {})}`;
            }
          }
        )}`;
      }
    }
  )} ${validate_component(Attribution, "Attribution").$$render(
    $$result,
    {
      proOptions,
      position: attributionPosition
    },
    {},
    {}
  )} ${slots.default ? slots.default({}) : ``} </div>`;
});
const ControlButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  let bgColor = void 0;
  let bgColorHover = void 0;
  let color = void 0;
  let colorHover = void 0;
  let borderColor = void 0;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<button${spread(
    [
      { type: "button" },
      {
        class: escape_attribute_value(cc(["svelte-flow__controls-button", className]))
      },
      escape_object($$restProps)
    ],
    {
      styles: {
        "--xy-controls-button-background-color-props": bgColor,
        "--xy-controls-button-background-color-hover-props": bgColorHover,
        "--xy-controls-button-color-props": color,
        "--xy-controls-button-color-hover-props": colorHover,
        "--xy-controls-button-border-color-props": borderColor
      }
    }
  )}>${slots.default ? slots.default({ class: "button-svg" }) : ``}</button>`;
});
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"></path></svg>`;
});
const Minus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 5"><path d="M0 0h32v4.2H0z"></path></svg>`;
});
const Fit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30"><path d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"></path></svg>`;
});
const Lock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"></path></svg>`;
});
const Unlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"></path></svg>`;
});
const Controls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isInteractive;
  let minZoomReached;
  let maxZoomReached;
  let orientationClass;
  let $maxZoom, $$unsubscribe_maxZoom;
  let $viewport, $$unsubscribe_viewport;
  let $minZoom, $$unsubscribe_minZoom;
  let $elementsSelectable, $$unsubscribe_elementsSelectable;
  let $nodesConnectable, $$unsubscribe_nodesConnectable;
  let $nodesDraggable, $$unsubscribe_nodesDraggable;
  let { position = "bottom-left" } = $$props;
  let { showZoom = true } = $$props;
  let { showFitView = true } = $$props;
  let { showLock = true } = $$props;
  let { buttonBgColor = void 0 } = $$props;
  let { buttonBgColorHover = void 0 } = $$props;
  let { buttonColor = void 0 } = $$props;
  let { buttonColorHover = void 0 } = $$props;
  let { buttonBorderColor = void 0 } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { orientation = "vertical" } = $$props;
  let { class: className = "" } = $$props;
  const { zoomIn, zoomOut, fitView: fitView2, viewport, minZoom, maxZoom, nodesDraggable, nodesConnectable, elementsSelectable } = useStore();
  $$unsubscribe_viewport = subscribe(viewport, (value) => $viewport = value);
  $$unsubscribe_minZoom = subscribe(minZoom, (value) => $minZoom = value);
  $$unsubscribe_maxZoom = subscribe(maxZoom, (value) => $maxZoom = value);
  $$unsubscribe_nodesDraggable = subscribe(nodesDraggable, (value) => $nodesDraggable = value);
  $$unsubscribe_nodesConnectable = subscribe(nodesConnectable, (value) => $nodesConnectable = value);
  $$unsubscribe_elementsSelectable = subscribe(elementsSelectable, (value) => $elementsSelectable = value);
  const buttonProps = {
    bgColor: buttonBgColor,
    bgColorHover: buttonBgColorHover,
    color: buttonColor,
    colorHover: buttonColorHover,
    borderColor: buttonBorderColor
  };
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.showZoom === void 0 && $$bindings.showZoom && showZoom !== void 0)
    $$bindings.showZoom(showZoom);
  if ($$props.showFitView === void 0 && $$bindings.showFitView && showFitView !== void 0)
    $$bindings.showFitView(showFitView);
  if ($$props.showLock === void 0 && $$bindings.showLock && showLock !== void 0)
    $$bindings.showLock(showLock);
  if ($$props.buttonBgColor === void 0 && $$bindings.buttonBgColor && buttonBgColor !== void 0)
    $$bindings.buttonBgColor(buttonBgColor);
  if ($$props.buttonBgColorHover === void 0 && $$bindings.buttonBgColorHover && buttonBgColorHover !== void 0)
    $$bindings.buttonBgColorHover(buttonBgColorHover);
  if ($$props.buttonColor === void 0 && $$bindings.buttonColor && buttonColor !== void 0)
    $$bindings.buttonColor(buttonColor);
  if ($$props.buttonColorHover === void 0 && $$bindings.buttonColorHover && buttonColorHover !== void 0)
    $$bindings.buttonColorHover(buttonColorHover);
  if ($$props.buttonBorderColor === void 0 && $$bindings.buttonBorderColor && buttonBorderColor !== void 0)
    $$bindings.buttonBorderColor(buttonBorderColor);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  isInteractive = $nodesDraggable || $nodesConnectable || $elementsSelectable;
  minZoomReached = $viewport.zoom <= $minZoom;
  maxZoomReached = $viewport.zoom >= $maxZoom;
  orientationClass = orientation === "horizontal" ? "horizontal" : "vertical";
  $$unsubscribe_maxZoom();
  $$unsubscribe_viewport();
  $$unsubscribe_minZoom();
  $$unsubscribe_elementsSelectable();
  $$unsubscribe_nodesConnectable();
  $$unsubscribe_nodesDraggable();
  return `${validate_component(Panel, "Panel").$$render(
    $$result,
    {
      class: cc(["svelte-flow__controls", orientationClass, className]),
      position,
      "data-testid": "svelte-flow__controls",
      "aria-label": ariaLabel ?? "Svelte Flow controls",
      style
    },
    {},
    {
      default: () => {
        return `${slots.before ? slots.before({}) : ``} ${showZoom ? `${validate_component(ControlButton, "ControlButton").$$render($$result, Object.assign({}, { class: "svelte-flow__controls-zoomin" }, { title: "zoom in" }, { "aria-label": "zoom in" }, { disabled: maxZoomReached }, buttonProps), {}, {
          default: () => {
            return `${validate_component(Plus, "PlusIcon").$$render($$result, {}, {}, {})}`;
          }
        })} ${validate_component(ControlButton, "ControlButton").$$render($$result, Object.assign({}, { class: "svelte-flow__controls-zoomout" }, { title: "zoom out" }, { "aria-label": "zoom out" }, { disabled: minZoomReached }, buttonProps), {}, {
          default: () => {
            return `${validate_component(Minus, "MinusIcon").$$render($$result, {}, {}, {})}`;
          }
        })}` : ``} ${showFitView ? `${validate_component(ControlButton, "ControlButton").$$render($$result, Object.assign({}, { class: "svelte-flow__controls-fitview" }, { title: "fit view" }, { "aria-label": "fit view" }, buttonProps), {}, {
          default: () => {
            return `${validate_component(Fit, "FitViewIcon").$$render($$result, {}, {}, {})}`;
          }
        })}` : ``} ${showLock ? `${validate_component(ControlButton, "ControlButton").$$render(
          $$result,
          Object.assign(
            {},
            {
              class: "svelte-flow__controls-interactive"
            },
            { title: "toggle interactivity" },
            { "aria-label": "toggle interactivity" },
            buttonProps
          ),
          {},
          {
            default: () => {
              return `${isInteractive ? `${validate_component(Unlock, "UnlockIcon").$$render($$result, {}, {}, {})}` : `${validate_component(Lock, "LockIcon").$$render($$result, {}, {}, {})}`}`;
            }
          }
        )}` : ``} ${slots.default ? slots.default({}) : ``} ${slots.after ? slots.after({}) : ``}`;
      }
    }
  )}`;
});
var BackgroundVariant;
(function(BackgroundVariant2) {
  BackgroundVariant2["Lines"] = "lines";
  BackgroundVariant2["Dots"] = "dots";
  BackgroundVariant2["Cross"] = "cross";
})(BackgroundVariant || (BackgroundVariant = {}));
const DotPattern = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { radius = 5 } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.radius === void 0 && $$bindings.radius && radius !== void 0)
    $$bindings.radius(radius);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<circle${add_attribute("cx", radius, 0)}${add_attribute("cy", radius, 0)}${add_attribute("r", radius, 0)}${add_attribute("class", cc(["svelte-flow__background-pattern", "dots", className]), 0)}></circle>`;
});
const LinePattern = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { lineWidth = 1 } = $$props;
  let { dimensions } = $$props;
  let { variant = void 0 } = $$props;
  let { class: className = "" } = $$props;
  if ($$props.lineWidth === void 0 && $$bindings.lineWidth && lineWidth !== void 0)
    $$bindings.lineWidth(lineWidth);
  if ($$props.dimensions === void 0 && $$bindings.dimensions && dimensions !== void 0)
    $$bindings.dimensions(dimensions);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<path${add_attribute("stroke-width", lineWidth, 0)}${add_attribute("d", `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`, 0)}${add_attribute("class", cc(["svelte-flow__background-pattern", variant, className]), 0)}></path>`;
});
const css$1 = {
  code: ".svelte-flow__background.svelte-1r7pe8d{position:absolute;width:100%;height:100%;top:0;left:0}",
  map: `{"version":3,"file":"Background.svelte","sources":["Background.svelte"],"sourcesContent":["<script labg=\\"ts\\" context=\\"module\\">\\n  const defaultSize = {\\n    [BackgroundVariant.Dots]: 1,\\n    [BackgroundVariant.Lines]: 1,\\n    [BackgroundVariant.Cross]: 6\\n  };\\n<\/script>\\n\\n<script>import cc from 'classcat';\\nimport DotPattern from './DotPattern.svelte';\\nimport LinePattern from './LinePattern.svelte';\\nimport { useStore } from '../../store';\\nimport { BackgroundVariant } from './types';\\nexport let id = undefined;\\nexport let variant = BackgroundVariant.Dots;\\nexport let gap = 20;\\nexport let size = 1;\\nexport let lineWidth = 1;\\nexport let bgColor = undefined;\\nexport let patternColor = undefined;\\nexport let patternClass = undefined;\\nlet className = '';\\nexport { className as class };\\nconst { viewport, flowId } = useStore();\\nconst patternSize = size || defaultSize[variant];\\nconst isDots = variant === BackgroundVariant.Dots;\\nconst isCross = variant === BackgroundVariant.Cross;\\nconst gapXY = Array.isArray(gap) ? gap : [gap, gap];\\n$: patternId = \`background-pattern-\${$flowId}-\${id ? id : ''}\`;\\n$: scaledGap = [gapXY[0] * $viewport.zoom || 1, gapXY[1] * $viewport.zoom || 1];\\n$: scaledSize = patternSize * $viewport.zoom;\\n$: patternDimensions = (isCross ? [scaledSize, scaledSize] : scaledGap);\\n$: patternOffset = isDots\\n    ? [scaledSize / 2, scaledSize / 2]\\n    : [patternDimensions[0] / 2, patternDimensions[1] / 2];\\n<\/script>\\n\\n<svg\\n  class={cc(['svelte-flow__background', className])}\\n  data-testid=\\"svelte-flow__background\\"\\n  style:--xy-background-color-props={bgColor}\\n  style:--xy-background-pattern-color-props={patternColor}\\n>\\n  <pattern\\n    id={patternId}\\n    x={$viewport.x % scaledGap[0]}\\n    y={$viewport.y % scaledGap[1]}\\n    width={scaledGap[0]}\\n    height={scaledGap[1]}\\n    patternUnits=\\"userSpaceOnUse\\"\\n    patternTransform={\`translate(-\${patternOffset[0]},-\${patternOffset[1]})\`}\\n  >\\n    {#if isDots}\\n      <DotPattern radius={scaledSize / 2} class={patternClass} />\\n    {:else}\\n      <LinePattern dimensions={patternDimensions} {variant} {lineWidth} class={patternClass} />\\n    {/if}\\n  </pattern>\\n  <rect x=\\"0\\" y=\\"0\\" width=\\"100%\\" height=\\"100%\\" fill={\`url(#\${patternId})\`} />\\n</svg>\\n\\n<style>\\n  .svelte-flow__background {\\n    position: absolute;\\n    width: 100%;\\n    height: 100%;\\n    top: 0;\\n    left: 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA8DE,uCAAyB,CACvB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CACR"}`
};
const defaultSize = {
  [BackgroundVariant.Dots]: 1,
  [BackgroundVariant.Lines]: 1,
  [BackgroundVariant.Cross]: 6
};
const Background = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let patternId;
  let scaledGap;
  let scaledSize;
  let patternDimensions;
  let patternOffset;
  let $viewport, $$unsubscribe_viewport;
  let $flowId, $$unsubscribe_flowId;
  let { id = void 0 } = $$props;
  let { variant = BackgroundVariant.Dots } = $$props;
  let { gap = 20 } = $$props;
  let { size = 1 } = $$props;
  let { lineWidth = 1 } = $$props;
  let { bgColor = void 0 } = $$props;
  let { patternColor = void 0 } = $$props;
  let { patternClass = void 0 } = $$props;
  let { class: className = "" } = $$props;
  const { viewport, flowId } = useStore();
  $$unsubscribe_viewport = subscribe(viewport, (value) => $viewport = value);
  $$unsubscribe_flowId = subscribe(flowId, (value) => $flowId = value);
  const patternSize = size || defaultSize[variant];
  const isDots = variant === BackgroundVariant.Dots;
  const isCross = variant === BackgroundVariant.Cross;
  const gapXY = Array.isArray(gap) ? gap : [gap, gap];
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0)
    $$bindings.gap(gap);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.lineWidth === void 0 && $$bindings.lineWidth && lineWidth !== void 0)
    $$bindings.lineWidth(lineWidth);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.patternColor === void 0 && $$bindings.patternColor && patternColor !== void 0)
    $$bindings.patternColor(patternColor);
  if ($$props.patternClass === void 0 && $$bindings.patternClass && patternClass !== void 0)
    $$bindings.patternClass(patternClass);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$result.css.add(css$1);
  patternId = `background-pattern-${$flowId}-${id ? id : ""}`;
  scaledGap = [gapXY[0] * $viewport.zoom || 1, gapXY[1] * $viewport.zoom || 1];
  scaledSize = patternSize * $viewport.zoom;
  patternDimensions = isCross ? [scaledSize, scaledSize] : scaledGap;
  patternOffset = isDots ? [scaledSize / 2, scaledSize / 2] : [patternDimensions[0] / 2, patternDimensions[1] / 2];
  $$unsubscribe_viewport();
  $$unsubscribe_flowId();
  return `<svg class="${escape(null_to_empty(cc(["svelte-flow__background", className])), true) + " svelte-1r7pe8d"}" data-testid="svelte-flow__background"${add_styles({
    "--xy-background-color-props": bgColor,
    "--xy-background-pattern-color-props": patternColor
  })}><pattern${add_attribute("id", patternId, 0)}${add_attribute("x", $viewport.x % scaledGap[0], 0)}${add_attribute("y", $viewport.y % scaledGap[1], 0)}${add_attribute("width", scaledGap[0], 0)}${add_attribute("height", scaledGap[1], 0)} patternUnits="userSpaceOnUse"${add_attribute("patternTransform", `translate(-${patternOffset[0]},-${patternOffset[1]})`, 0)}>${isDots ? `${validate_component(DotPattern, "DotPattern").$$render(
    $$result,
    {
      radius: scaledSize / 2,
      class: patternClass
    },
    {},
    {}
  )}` : `${validate_component(LinePattern, "LinePattern").$$render(
    $$result,
    {
      dimensions: patternDimensions,
      variant,
      lineWidth,
      class: patternClass
    },
    {},
    {}
  )}`}</pattern><rect x="0" y="0" width="100%" height="100%"${add_attribute("fill", `url(#${patternId})`, 0)}></rect></svg>`;
});
const createNodeEventDispatcher = () => createEventDispatcher();
const css = {
  code: "main.svelte-1rmo8v{height:calc(100vh - 40px)}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n\\timport { writable } from 'svelte/store';\\r\\n\\timport { SvelteFlow, Background, Controls } from '@xyflow/svelte';\\r\\n  \\r\\n\\timport '@xyflow/svelte/dist/style.css';\\r\\n  \\r\\n\\tconst nodes = writable([\\r\\n\\t\\t{\\r\\n\\t\\t\\tid: '1', // required and needs to be a string\\r\\n\\t\\t\\tposition: { x: 0, y: 0 }, // required\\r\\n\\t\\t\\tdata: { label: 'hey' }, // required\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tid: '2',\\r\\n\\t\\t\\tposition: { x: 100, y: 100 },\\r\\n\\t\\t\\tdata: { label: 'world' },\\r\\n\\t\\t},\\r\\n\\t]);\\r\\n\\tconst edges = writable([]);\\r\\n  <\/script>\\r\\n  \\r\\n  <main>\\r\\n\\t<SvelteFlow {nodes} {edges}>\\r\\n\\t  <Background bgColor={'#0a0a0a'} />\\r\\n\\t  <Controls />\\r\\n\\t</SvelteFlow>\\r\\n  </main>\\r\\n  \\r\\n  <style>\\r\\n\\tmain {\\r\\n\\t  height: calc(100vh - 40px);\\r\\n\\t}\\r\\n  </style>"],"names":[],"mappings":"AA6BC,kBAAK,CACH,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAC3B"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const nodes = writable([
    {
      id: "1",
      // required and needs to be a string
      position: { x: 0, y: 0 },
      // required
      data: { label: "hey" }
      // required
    },
    {
      id: "2",
      position: { x: 100, y: 100 },
      data: { label: "world" }
    }
  ]);
  const edges = writable([]);
  $$result.css.add(css);
  return `<main class="svelte-1rmo8v">${validate_component(SvelteFlow, "SvelteFlow").$$render($$result, { nodes, edges }, {}, {
    default: () => {
      return `${validate_component(Background, "Background").$$render($$result, { bgColor: "#0a0a0a" }, {}, {})} ${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}`;
    }
  })} </main>`;
});
export {
  Page as default
};
