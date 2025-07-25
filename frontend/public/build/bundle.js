
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    // Adapted from https://github.com/then/is-promise/blob/master/index.js
    // Distributed under MIT License https://github.com/then/is-promise/blob/master/LICENSE
    function is_promise(value) {
        return !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    /**
     * List of attributes that should always be set through the attr method,
     * because updating them through the property setter doesn't work reliably.
     * In the example of `width`/`height`, the problem is that the setter only
     * accepts numeric values, but the attribute can also be set to a string like `50%`.
     * If this list becomes too big, rethink this approach.
     */
    const always_set_through_set_attribute = ['width', 'height'];
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function set_custom_element_data_map(node, data_map) {
        Object.keys(data_map).forEach((key) => {
            set_custom_element_data(node, key, data_map[key]);
        });
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function set_dynamic_element_data(tag) {
        return (/-/.test(tag)) ? set_custom_element_data_map : set_attributes;
    }
    function init_binding_group(group) {
        let _inputs;
        return {
            /* push */ p(...inputs) {
                _inputs = inputs;
                _inputs.forEach(input => group.push(input));
            },
            /* remove */ r() {
                _inputs.forEach(input => group.splice(group.indexOf(input), 1));
            }
        };
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                /** #7364  target for <template> may be provided as #document-fragment(11) */
                else
                    this.e = element((target.nodeType === 11 ? 'TEMPLATE' : target.nodeName));
                this.t = target.tagName !== 'TEMPLATE' ? target : target.content;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * Schedules a callback to run immediately before the component is updated after any state change.
     *
     * The first time the callback runs will be before the initial `onMount`
     *
     * https://svelte.dev/docs#run-time-svelte-beforeupdate
     */
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        const options = { direction: 'in' };
        let config = fn(node, params, options);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config(options);
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        const options = { direction: 'out' };
        let config = fn(node, params, options);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config(options);
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                if (info.blocks[i] === block) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
                if (!info.hasCatch) {
                    throw error;
                }
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
    }

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        const updates = [];
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                // defer updates until all the DOM shuffling is done
                updates.push(() => block.p(child_ctx, dirty));
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        run_all(updates);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    /** regex of all html void element names */
    const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
    function is_void(name) {
        return void_element_names.test(name) || name.toLowerCase() === '!doctype';
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function validate_dynamic_element(tag) {
        const is_string = typeof tag === 'string';
        if (tag && !is_string) {
            throw new Error('<svelte:element> expects "this" attribute to be a string.');
        }
    }
    function validate_void_dynamic_element(tag) {
        if (tag && is_void(tag)) {
            console.warn(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* ../node_modules/@svelteuidev/core/dist/internal/errors/Error.svelte generated by Svelte v3.59.2 */

    const { Error: Error_1$3 } = globals;

    // (7:0) {#if observable}
    function create_if_block$j(ctx) {
    	let html_tag;
    	let raw_value = exception(/*component*/ ctx[1], /*code*/ ctx[2]) + "";
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*component, code*/ 6 && raw_value !== (raw_value = exception(/*component*/ ctx[1], /*code*/ ctx[2]) + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$j.name,
    		type: "if",
    		source: "(7:0) {#if observable}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$D(ctx) {
    	let if_block_anchor;
    	let if_block = /*observable*/ ctx[0] && create_if_block$j(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1$3("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*observable*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$j(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$D($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Error', slots, []);
    	let { observable = false } = $$props;
    	let { component } = $$props;
    	let { code } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (component === undefined && !('component' in $$props || $$self.$$.bound[$$self.$$.props['component']])) {
    			console.warn("<Error> was created without expected prop 'component'");
    		}

    		if (code === undefined && !('code' in $$props || $$self.$$.bound[$$self.$$.props['code']])) {
    			console.warn("<Error> was created without expected prop 'code'");
    		}
    	});

    	const writable_props = ['observable', 'component', 'code'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Error> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('observable' in $$props) $$invalidate(0, observable = $$props.observable);
    		if ('component' in $$props) $$invalidate(1, component = $$props.component);
    		if ('code' in $$props) $$invalidate(2, code = $$props.code);
    	};

    	$$self.$capture_state = () => ({ exception, observable, component, code });

    	$$self.$inject_state = $$props => {
    		if ('observable' in $$props) $$invalidate(0, observable = $$props.observable);
    		if ('component' in $$props) $$invalidate(1, component = $$props.component);
    		if ('code' in $$props) $$invalidate(2, code = $$props.code);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [observable, component, code];
    }

    let Error$1 = class Error extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$D, create_fragment$D, safe_not_equal, { observable: 0, component: 1, code: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Error",
    			options,
    			id: create_fragment$D.name
    		});
    	}

    	get observable() {
    		throw new Error_1$3("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set observable(value) {
    		throw new Error_1$3("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error_1$3("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error_1$3("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get code() {
    		throw new Error_1$3("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set code(value) {
    		throw new Error_1$3("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    };

    var Error$2 = Error$1;

    const isBrowser = () => typeof window !== 'undefined';
    /** Determines whether the app is running in the browser or on the server. */
    const browser = isBrowser();

    const minifiedCss = '.modal-header{padding: 2px 16px;background-color: #339af0;color: white;}.modal-body{padding: 2px 16px;}.modal-footer{padding: 2px 16px;background-color: #339af0;color: white;}.modal-content{position: relative;background-color: #fefefe;margin: auto;padding: 0;border: 1px solid #888;width: 80%;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);animation-name: animateTop;animation-duration: 0.4s;}@keyframes animateTop {from {top: -300px; opacity: 0}to {top: 0; opacity: 1}}';

    const style = browser ? document.createElement('style') : undefined;
    if (browser) {
        const s = style;
        s.textContent = minifiedCss;
        s.id = 'svelteui-inject';
    }
    /**
     * The UserException function is used to help consumers of the library better navigate through potential errors.
     *
     *
     * It **does not** throw any errors because crashing the user's application is undesirable
     *
     * @param component the component the error is bound to
     * @param message the error message for the consumer
     * @param solution the potential solution for the consumer
     */
    function UserException(component, message, solution) {
        if (browser)
            document.head.appendChild(style);
        const html = `
    <div class="modal-content">
        <div class="modal-header">
            <h2>[${component} Component Error]:</h2>
            <h3>${message}</h3>
        </div>
        <div class="modal-body">
            <pre>
                ${solution ? solution : ''}
            </pre>
        </div>
        <div class="modal-footer">
            <h3>Fix the code to dismiss this error.</h3>
        </div>
    </div>        
    `;
        return html;
    }

    function exception(component, code) {
        const { message, solution } = code;
        if (solution) {
            return UserException(component, message, solution);
        }
        return UserException(component, message);
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    // This file taken from rgossiaux/svelte-headlessui
    // Copyright 2020-present Hunter Perrin
    function useActions(node, actions) {
        const actionReturns = [];
        if (actions) {
            for (let i = 0; i < actions.length; i++) {
                const actionEntry = actions[i];
                const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
                if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                    actionReturns.push(action(node, actionEntry[1]));
                }
                else {
                    actionReturns.push(action(node));
                }
            }
        }
        return {
            update(actions) {
                if (((actions && actions.length) || 0) != actionReturns.length) {
                    throw new Error('You must not change the length of an actions array.');
                }
                if (actions) {
                    for (let i = 0; i < actions.length; i++) {
                        const returnEntry = actionReturns[i];
                        if (returnEntry && returnEntry.update) {
                            const actionEntry = actions[i];
                            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                                returnEntry.update(actionEntry[1]);
                            }
                            else {
                                returnEntry.update();
                            }
                        }
                    }
                }
            },
            destroy() {
                for (let i = 0; i < actionReturns.length; i++) {
                    const returnEntry = actionReturns[i];
                    if (returnEntry && returnEntry.destroy) {
                        returnEntry.destroy();
                    }
                }
            }
        };
    }

    /* eslint-disable @typescript-eslint/no-empty-function */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const MODIFIER_DIVIDER = '!';
    const modifierRegex = new RegExp(`^[^${MODIFIER_DIVIDER}]+(?:${MODIFIER_DIVIDER}(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$`);
    /** Function for forwarding DOM events to the component's declaration */
    function createEventForwarder(component, except = []) {
        // This is our pseudo $on function. It is defined on component mount.
        let $on;
        // This is a list of events bound before mount.
        const events = [];
        // And we override the $on function to forward all bound events.
        component.$on = (fullEventType, callback) => {
            const eventType = fullEventType;
            let destructor = () => { };
            for (const exception of except) {
                if (typeof exception === 'string' && exception === eventType) {
                    // Bail out of the event forwarding and run the normal Svelte $on() code
                    const callbacks = component.$$.callbacks[eventType] || (component.$$.callbacks[eventType] = []);
                    callbacks.push(callback);
                    return () => {
                        const index = callbacks.indexOf(callback);
                        if (index !== -1)
                            callbacks.splice(index, 1);
                    };
                }
                if (typeof exception === 'object' && exception['name'] === eventType) {
                    const oldCallback = callback;
                    callback = (...props) => {
                        if (!(typeof exception === 'object' && exception['shouldExclude']())) {
                            oldCallback(...props);
                        }
                    };
                }
            }
            if ($on) {
                // The event was bound programmatically.
                destructor = $on(eventType, callback);
            }
            else {
                // The event was bound before mount by Svelte.
                events.push([eventType, callback]);
            }
            return () => {
                destructor();
            };
        };
        function forward(e) {
            // Internally bubble the event up from Svelte components.
            bubble(component, e);
        }
        return (node) => {
            const destructors = [];
            const forwardDestructors = {};
            // This function is responsible for listening and forwarding
            // all bound events.
            $on = (fullEventType, callback) => {
                let eventType = fullEventType;
                let handler = callback;
                // DOM addEventListener options argument.
                let options = false;
                const modifierMatch = eventType.match(modifierRegex);
                if (modifierMatch) {
                    // Parse the event modifiers.
                    // Supported modifiers:
                    // - preventDefault
                    // - stopPropagation
                    // - passive
                    // - nonpassive
                    // - capture
                    // - once
                    const parts = eventType.split(MODIFIER_DIVIDER);
                    eventType = parts[0];
                    const eventOptions = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
                    if (eventOptions.passive) {
                        options = options || {};
                        options.passive = true;
                    }
                    if (eventOptions.nonpassive) {
                        options = options || {};
                        options.passive = false;
                    }
                    if (eventOptions.capture) {
                        options = options || {};
                        options.capture = true;
                    }
                    if (eventOptions.once) {
                        options = options || {};
                        options.once = true;
                    }
                    if (eventOptions.preventDefault) {
                        handler = prevent_default(handler);
                    }
                    if (eventOptions.stopPropagation) {
                        handler = stop_propagation(handler);
                    }
                }
                // Listen for the event directly, with the given options.
                const off = listen(node, eventType, handler, options);
                const destructor = () => {
                    off();
                    const idx = destructors.indexOf(destructor);
                    if (idx > -1) {
                        destructors.splice(idx, 1);
                    }
                };
                destructors.push(destructor);
                // Forward the event from Svelte.
                if (!(eventType in forwardDestructors)) {
                    forwardDestructors[eventType] = listen(node, eventType, forward);
                }
                return destructor;
            };
            for (let i = 0; i < events.length; i++) {
                // Listen to all the events added before mount.
                $on(events[i][0], events[i][1]);
            }
            return {
                destroy: () => {
                    // Remove all event listeners.
                    for (let i = 0; i < destructors.length; i++) {
                        destructors[i]();
                    }
                    // Remove all event forwarders.
                    for (const entry of Object.entries(forwardDestructors)) {
                        entry[1]();
                    }
                }
            };
        };
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    /** --------------------- */
    const key = {};
    function useSvelteUIThemeContext() {
        return getContext(key);
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier} [start]
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=} start
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0 && stop) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let started = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (started) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            started = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
                // We need to set this to false because callbacks can still happen despite having unsubscribed:
                // Callbacks might already be placed in the queue which doesn't know it should no longer
                // invoke this derived store.
                started = false;
            };
        });
    }

    const colorScheme = writable('light');

    var t="colors",n="sizes",r="space",i={gap:r,gridGap:r,columnGap:r,gridColumnGap:r,rowGap:r,gridRowGap:r,inset:r,insetBlock:r,insetBlockEnd:r,insetBlockStart:r,insetInline:r,insetInlineEnd:r,insetInlineStart:r,margin:r,marginTop:r,marginRight:r,marginBottom:r,marginLeft:r,marginBlock:r,marginBlockEnd:r,marginBlockStart:r,marginInline:r,marginInlineEnd:r,marginInlineStart:r,padding:r,paddingTop:r,paddingRight:r,paddingBottom:r,paddingLeft:r,paddingBlock:r,paddingBlockEnd:r,paddingBlockStart:r,paddingInline:r,paddingInlineEnd:r,paddingInlineStart:r,top:r,right:r,bottom:r,left:r,scrollMargin:r,scrollMarginTop:r,scrollMarginRight:r,scrollMarginBottom:r,scrollMarginLeft:r,scrollMarginX:r,scrollMarginY:r,scrollMarginBlock:r,scrollMarginBlockEnd:r,scrollMarginBlockStart:r,scrollMarginInline:r,scrollMarginInlineEnd:r,scrollMarginInlineStart:r,scrollPadding:r,scrollPaddingTop:r,scrollPaddingRight:r,scrollPaddingBottom:r,scrollPaddingLeft:r,scrollPaddingX:r,scrollPaddingY:r,scrollPaddingBlock:r,scrollPaddingBlockEnd:r,scrollPaddingBlockStart:r,scrollPaddingInline:r,scrollPaddingInlineEnd:r,scrollPaddingInlineStart:r,fontSize:"fontSizes",background:t,backgroundColor:t,backgroundImage:t,borderImage:t,border:t,borderBlock:t,borderBlockEnd:t,borderBlockStart:t,borderBottom:t,borderBottomColor:t,borderColor:t,borderInline:t,borderInlineEnd:t,borderInlineStart:t,borderLeft:t,borderLeftColor:t,borderRight:t,borderRightColor:t,borderTop:t,borderTopColor:t,caretColor:t,color:t,columnRuleColor:t,fill:t,outline:t,outlineColor:t,stroke:t,textDecorationColor:t,fontFamily:"fonts",fontWeight:"fontWeights",lineHeight:"lineHeights",letterSpacing:"letterSpacings",blockSize:n,minBlockSize:n,maxBlockSize:n,inlineSize:n,minInlineSize:n,maxInlineSize:n,width:n,minWidth:n,maxWidth:n,height:n,minHeight:n,maxHeight:n,flexBasis:n,gridTemplateColumns:n,gridTemplateRows:n,borderWidth:"borderWidths",borderTopWidth:"borderWidths",borderRightWidth:"borderWidths",borderBottomWidth:"borderWidths",borderLeftWidth:"borderWidths",borderStyle:"borderStyles",borderTopStyle:"borderStyles",borderRightStyle:"borderStyles",borderBottomStyle:"borderStyles",borderLeftStyle:"borderStyles",borderRadius:"radii",borderTopLeftRadius:"radii",borderTopRightRadius:"radii",borderBottomRightRadius:"radii",borderBottomLeftRadius:"radii",boxShadow:"shadows",textShadow:"shadows",transition:"transitions",zIndex:"zIndices"},o=(e,t)=>"function"==typeof t?{"()":Function.prototype.toString.call(t)}:t,l=()=>{const e=Object.create(null);return (t,n,...r)=>{const i=(e=>JSON.stringify(e,o))(t);return i in e?e[i]:e[i]=n(t,...r)}},s=Symbol.for("sxs.internal"),a=(e,t)=>Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)),c=e=>{for(const t in e)return !0;return !1},{hasOwnProperty:d}=Object.prototype,g=e=>e.includes("-")?e:e.replace(/[A-Z]/g,(e=>"-"+e.toLowerCase())),p=/\s+(?![^()]*\))/,u=e=>t=>e(..."string"==typeof t?String(t).split(p):[t]),h={appearance:e=>({WebkitAppearance:e,appearance:e}),backfaceVisibility:e=>({WebkitBackfaceVisibility:e,backfaceVisibility:e}),backdropFilter:e=>({WebkitBackdropFilter:e,backdropFilter:e}),backgroundClip:e=>({WebkitBackgroundClip:e,backgroundClip:e}),boxDecorationBreak:e=>({WebkitBoxDecorationBreak:e,boxDecorationBreak:e}),clipPath:e=>({WebkitClipPath:e,clipPath:e}),content:e=>({content:e.includes('"')||e.includes("'")||/^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e)?e:`"${e}"`}),hyphens:e=>({WebkitHyphens:e,hyphens:e}),maskImage:e=>({WebkitMaskImage:e,maskImage:e}),maskSize:e=>({WebkitMaskSize:e,maskSize:e}),tabSize:e=>({MozTabSize:e,tabSize:e}),textSizeAdjust:e=>({WebkitTextSizeAdjust:e,textSizeAdjust:e}),userSelect:e=>({WebkitUserSelect:e,userSelect:e}),marginBlock:u(((e,t)=>({marginBlockStart:e,marginBlockEnd:t||e}))),marginInline:u(((e,t)=>({marginInlineStart:e,marginInlineEnd:t||e}))),maxSize:u(((e,t)=>({maxBlockSize:e,maxInlineSize:t||e}))),minSize:u(((e,t)=>({minBlockSize:e,minInlineSize:t||e}))),paddingBlock:u(((e,t)=>({paddingBlockStart:e,paddingBlockEnd:t||e}))),paddingInline:u(((e,t)=>({paddingInlineStart:e,paddingInlineEnd:t||e})))},f=/([\d.]+)([^]*)/,m=(e,t)=>e.length?e.reduce(((e,n)=>(e.push(...t.map((e=>e.includes("&")?e.replace(/&/g,/[ +>|~]/.test(n)&&/&.*&/.test(e)?`:is(${n})`:n):n+" "+e))),e)),[]):t,b=(e,t)=>e in S&&"string"==typeof t?t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/,((t,n,r,i)=>n+("stretch"===r?`-moz-available${i};${g(e)}:${n}-webkit-fill-available`:`-moz-fit-content${i};${g(e)}:${n}fit-content`)+i)):String(t),S={blockSize:1,height:1,inlineSize:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,width:1},k=e=>e?e+"-":"",y=(e,t,n)=>e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g,((e,r,i,o,l)=>"$"==o==!!i?e:(r||"--"==o?"calc(":"")+"var(--"+("$"===o?k(t)+(l.includes("$")?"":k(n))+l.replace(/\$/g,"-"):l)+")"+(r||"--"==o?"*"+(r||"")+(i||"1")+")":""))),B=/\s*,\s*(?![^()]*\))/,$=Object.prototype.toString,x=(e,t,n,r,i)=>{let o,l,s;const a=(e,t,n)=>{let c,d;const p=e=>{for(c in e){const x=64===c.charCodeAt(0),z=x&&Array.isArray(e[c])?e[c]:[e[c]];for(d of z){const e=/[A-Z]/.test(S=c)?S:S.replace(/-[^]/g,(e=>e[1].toUpperCase())),z="object"==typeof d&&d&&d.toString===$&&(!r.utils[e]||!t.length);if(e in r.utils&&!z){const t=r.utils[e];if(t!==l){l=t,p(t(d)),l=null;continue}}else if(e in h){const t=h[e];if(t!==s){s=t,p(t(d)),s=null;continue}}if(x&&(u=c.slice(1)in r.media?"@media "+r.media[c.slice(1)]:c,c=u.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g,((e,t,n,r,i,o)=>{const l=f.test(t),s=.0625*(l?-1:1),[a,c]=l?[r,t]:[t,r];return "("+("="===n[0]?"":">"===n[0]===l?"max-":"min-")+a+":"+("="!==n[0]&&1===n.length?c.replace(f,((e,t,r)=>Number(t)+s*(">"===n?1:-1)+r)):c)+(i?") and ("+(">"===i[0]?"min-":"max-")+a+":"+(1===i.length?o.replace(f,((e,t,n)=>Number(t)+s*(">"===i?-1:1)+n)):o):"")+")"}))),z){const e=x?n.concat(c):[...n],r=x?[...t]:m(t,c.split(B));void 0!==o&&i(I(...o)),o=void 0,a(d,r,e);}else void 0===o&&(o=[[],t,n]),c=x||36!==c.charCodeAt(0)?c:`--${k(r.prefix)}${c.slice(1).replace(/\$/g,"-")}`,d=z?d:"number"==typeof d?d&&e in R?String(d)+"px":String(d):y(b(e,null==d?"":d),r.prefix,r.themeMap[e]),o[0].push(`${x?`${c} `:`${g(c)}:`}${d}`);}}var u,S;};p(e),void 0!==o&&i(I(...o)),o=void 0;};a(e,t,n);},I=(e,t,n)=>`${n.map((e=>`${e}{`)).join("")}${t.length?`${t.join(",")}{`:""}${e.join(";")}${t.length?"}":""}${Array(n.length?n.length+1:0).join("}")}`,R={animationDelay:1,animationDuration:1,backgroundSize:1,blockSize:1,border:1,borderBlock:1,borderBlockEnd:1,borderBlockEndWidth:1,borderBlockStart:1,borderBlockStartWidth:1,borderBlockWidth:1,borderBottom:1,borderBottomLeftRadius:1,borderBottomRightRadius:1,borderBottomWidth:1,borderEndEndRadius:1,borderEndStartRadius:1,borderInlineEnd:1,borderInlineEndWidth:1,borderInlineStart:1,borderInlineStartWidth:1,borderInlineWidth:1,borderLeft:1,borderLeftWidth:1,borderRadius:1,borderRight:1,borderRightWidth:1,borderSpacing:1,borderStartEndRadius:1,borderStartStartRadius:1,borderTop:1,borderTopLeftRadius:1,borderTopRightRadius:1,borderTopWidth:1,borderWidth:1,bottom:1,columnGap:1,columnRule:1,columnRuleWidth:1,columnWidth:1,containIntrinsicSize:1,flexBasis:1,fontSize:1,gap:1,gridAutoColumns:1,gridAutoRows:1,gridTemplateColumns:1,gridTemplateRows:1,height:1,inlineSize:1,inset:1,insetBlock:1,insetBlockEnd:1,insetBlockStart:1,insetInline:1,insetInlineEnd:1,insetInlineStart:1,left:1,letterSpacing:1,margin:1,marginBlock:1,marginBlockEnd:1,marginBlockStart:1,marginBottom:1,marginInline:1,marginInlineEnd:1,marginInlineStart:1,marginLeft:1,marginRight:1,marginTop:1,maxBlockSize:1,maxHeight:1,maxInlineSize:1,maxWidth:1,minBlockSize:1,minHeight:1,minInlineSize:1,minWidth:1,offsetDistance:1,offsetRotate:1,outline:1,outlineOffset:1,outlineWidth:1,overflowClipMargin:1,padding:1,paddingBlock:1,paddingBlockEnd:1,paddingBlockStart:1,paddingBottom:1,paddingInline:1,paddingInlineEnd:1,paddingInlineStart:1,paddingLeft:1,paddingRight:1,paddingTop:1,perspective:1,right:1,rowGap:1,scrollMargin:1,scrollMarginBlock:1,scrollMarginBlockEnd:1,scrollMarginBlockStart:1,scrollMarginBottom:1,scrollMarginInline:1,scrollMarginInlineEnd:1,scrollMarginInlineStart:1,scrollMarginLeft:1,scrollMarginRight:1,scrollMarginTop:1,scrollPadding:1,scrollPaddingBlock:1,scrollPaddingBlockEnd:1,scrollPaddingBlockStart:1,scrollPaddingBottom:1,scrollPaddingInline:1,scrollPaddingInlineEnd:1,scrollPaddingInlineStart:1,scrollPaddingLeft:1,scrollPaddingRight:1,scrollPaddingTop:1,shapeMargin:1,textDecoration:1,textDecorationThickness:1,textIndent:1,textUnderlineOffset:1,top:1,transitionDelay:1,transitionDuration:1,verticalAlign:1,width:1,wordSpacing:1},z=e=>String.fromCharCode(e+(e>25?39:97)),W=e=>(e=>{let t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=z(t%52)+n;return z(t%52)+n})(((e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e})(5381,JSON.stringify(e))>>>0),j=["themed","global","styled","onevar","resonevar","allvar","inline"],E=e=>{if(e.href&&!e.href.startsWith(location.origin))return !1;try{return !!e.cssRules}catch(e){return !1}},T=e=>{let t;const n=()=>{const{cssRules:e}=t.sheet;return [].map.call(e,((n,r)=>{const{cssText:i}=n;let o="";if(i.startsWith("--sxs"))return "";if(e[r-1]&&(o=e[r-1].cssText).startsWith("--sxs")){if(!n.cssRules.length)return "";for(const e in t.rules)if(t.rules[e].group===n)return `--sxs{--sxs:${[...t.rules[e].cache].join(" ")}}${i}`;return n.cssRules.length?`${o}${i}`:""}return i})).join("")},r=()=>{if(t){const{rules:e,sheet:n}=t;if(!n.deleteRule){for(;3===Object(Object(n.cssRules)[0]).type;)n.cssRules.splice(0,1);n.cssRules=[];}for(const t in e)delete e[t];}const i=Object(e).styleSheets||[];for(const e of i)if(E(e)){for(let i=0,o=e.cssRules;o[i];++i){const l=Object(o[i]);if(1!==l.type)continue;const s=Object(o[i+1]);if(4!==s.type)continue;++i;const{cssText:a}=l;if(!a.startsWith("--sxs"))continue;const c=a.slice(14,-3).trim().split(/\s+/),d=j[c[0]];d&&(t||(t={sheet:e,reset:r,rules:{},toString:n}),t.rules[d]={group:s,index:i,cache:new Set(c)});}if(t)break}if(!t){const i=(e,t)=>({type:t,cssRules:[],insertRule(e,t){this.cssRules.splice(t,0,i(e,{import:3,undefined:1}[(e.toLowerCase().match(/^@([a-z]+)/)||[])[1]]||4));},get cssText(){return "@media{}"===e?`@media{${[].map.call(this.cssRules,(e=>e.cssText)).join("")}}`:e}});t={sheet:e?(e.head||e).appendChild(document.createElement("style")).sheet:i("","text/css"),rules:{},reset:r,toString:n};}const{sheet:o,rules:l}=t;for(let e=j.length-1;e>=0;--e){const t=j[e];if(!l[t]){const n=j[e+1],r=l[n]?l[n].index:o.cssRules.length;o.insertRule("@media{}",r),o.insertRule(`--sxs{--sxs:${e}}`,r),l[t]={group:o.cssRules[r+1],index:r,cache:new Set([e])};}v(l[t]);}};return r(),t},v=e=>{const t=e.group;let n=t.cssRules.length;e.apply=e=>{try{t.insertRule(e,n),++n;}catch(e){}};},M=Symbol(),w=l(),C=(e,t)=>w(e,(()=>(...n)=>{let r={type:null,composers:new Set};for(const t of n)if(null!=t)if(t[s]){null==r.type&&(r.type=t[s].type);for(const e of t[s].composers)r.composers.add(e);}else t.constructor!==Object||t.$$typeof?null==r.type&&(r.type=t):r.composers.add(P(t,e));return null==r.type&&(r.type="span"),r.composers.size||r.composers.add(["PJLV",{},[],[],{},[]]),L(e,r,t)})),P=({variants:e,compoundVariants:t,defaultVariants:n,...r},i)=>{const o=`${k(i.prefix)}c-${W(r)}`,l=[],s=[],a=Object.create(null),g=[];for(const e in n)a[e]=String(n[e]);if("object"==typeof e&&e)for(const t in e){p=a,u=t,d.call(p,u)||(a[t]="undefined");const n=e[t];for(const e in n){const r={[t]:String(e)};"undefined"===String(e)&&g.push(t);const i=n[e],o=[r,i,!c(i)];l.push(o);}}var p,u;if("object"==typeof t&&t)for(const e of t){let{css:t,...n}=e;t="object"==typeof t&&t||{};for(const e in n)n[e]=String(n[e]);const r=[n,t,!c(t)];s.push(r);}return [o,r,l,s,a,g]},L=(e,t,n)=>{const[r,i,o,l]=O(t.composers),c="function"==typeof t.type||t.type.$$typeof?(e=>{function t(){for(let n=0;n<t[M].length;n++){const[r,i]=t[M][n];e.rules[r].apply(i);}return t[M]=[],null}return t[M]=[],t.rules={},j.forEach((e=>t.rules[e]={apply:n=>t[M].push([e,n])})),t})(n):null,d=(c||n).rules,g=`.${r}${i.length>1?`:where(.${i.slice(1).join(".")})`:""}`,p=s=>{s="object"==typeof s&&s||D;const{css:a,...p}=s,u={};for(const e in o)if(delete p[e],e in s){let t=s[e];"object"==typeof t&&t?u[e]={"@initial":o[e],...t}:(t=String(t),u[e]="undefined"!==t||l.has(e)?t:o[e]);}else u[e]=o[e];const h=new Set([...i]);for(const[r,i,o,l]of t.composers){n.rules.styled.cache.has(r)||(n.rules.styled.cache.add(r),x(i,[`.${r}`],[],e,(e=>{d.styled.apply(e);})));const t=A(o,u,e.media),s=A(l,u,e.media,!0);for(const i of t)if(void 0!==i)for(const[t,o,l]of i){const i=`${r}-${W(o)}-${t}`;h.add(i);const s=(l?n.rules.resonevar:n.rules.onevar).cache,a=l?d.resonevar:d.onevar;s.has(i)||(s.add(i),x(o,[`.${i}`],[],e,(e=>{a.apply(e);})));}for(const t of s)if(void 0!==t)for(const[i,o]of t){const t=`${r}-${W(o)}-${i}`;h.add(t),n.rules.allvar.cache.has(t)||(n.rules.allvar.cache.add(t),x(o,[`.${t}`],[],e,(e=>{d.allvar.apply(e);})));}}if("object"==typeof a&&a){const t=`${r}-i${W(a)}-css`;h.add(t),n.rules.inline.cache.has(t)||(n.rules.inline.cache.add(t),x(a,[`.${t}`],[],e,(e=>{d.inline.apply(e);})));}for(const e of String(s.className||"").trim().split(/\s+/))e&&h.add(e);const f=p.className=[...h].join(" ");return {type:t.type,className:f,selector:g,props:p,toString:()=>f,deferredInjector:c}};return a(p,{className:r,selector:g,[s]:t,toString:()=>(n.rules.styled.cache.has(r)||p(),r)})},O=e=>{let t="";const n=[],r={},i=[];for(const[o,,,,l,s]of e){""===t&&(t=o),n.push(o),i.push(...s);for(const e in l){const t=l[e];(void 0===r[e]||"undefined"!==t||s.includes(t))&&(r[e]=t);}}return [t,n,r,new Set(i)]},A=(e,t,n,r)=>{const i=[];e:for(let[o,l,s]of e){if(s)continue;let e,a=0,c=!1;for(e in o){const r=o[e];let i=t[e];if(i!==r){if("object"!=typeof i||!i)continue e;{let e,t,o=0;for(const l in i){if(r===String(i[l])){if("@initial"!==l){const e=l.slice(1);(t=t||[]).push(e in n?n[e]:l.replace(/^@media ?/,"")),c=!0;}a+=o,e=!0;}++o;}if(t&&t.length&&(l={["@media "+t.join(", ")]:l}),!e)continue e}}}(i[a]=i[a]||[]).push([r?"cv":`${e}-${o[e]}`,l,c]);}return i},D={},H=l(),N=(e,t)=>H(e,(()=>(...n)=>{const r=()=>{for(let r of n){r="object"==typeof r&&r||{};let n=W(r);if(!t.rules.global.cache.has(n)){if(t.rules.global.cache.add(n),"@import"in r){let e=[].indexOf.call(t.sheet.cssRules,t.rules.themed.group)-1;for(let n of [].concat(r["@import"]))n=n.includes('"')||n.includes("'")?n:`"${n}"`,t.sheet.insertRule(`@import ${n};`,e++);delete r["@import"];}x(r,[],[],e,(e=>{t.rules.global.apply(e);}));}}return ""};return a(r,{toString:r})})),V=l(),G=(e,t)=>V(e,(()=>n=>{const r=`${k(e.prefix)}k-${W(n)}`,i=()=>{if(!t.rules.global.cache.has(r)){t.rules.global.cache.add(r);const i=[];x(n,[],[],e,(e=>i.push(e)));const o=`@keyframes ${r}{${i.join("")}}`;t.rules.global.apply(o);}return r};return a(i,{get name(){return i()},toString:i})})),F=class{constructor(e,t,n,r){this.token=null==e?"":String(e),this.value=null==t?"":String(t),this.scale=null==n?"":String(n),this.prefix=null==r?"":String(r);}get computedValue(){return "var("+this.variable+")"}get variable(){return "--"+k(this.prefix)+k(this.scale)+this.token}toString(){return this.computedValue}},J=l(),U=(e,t)=>J(e,(()=>(n,r)=>{r="object"==typeof n&&n||Object(r);const i=`.${n=(n="string"==typeof n?n:"")||`${k(e.prefix)}t-${W(r)}`}`,o={},l=[];for(const t in r){o[t]={};for(const n in r[t]){const i=`--${k(e.prefix)}${t}-${n}`,s=y(String(r[t][n]),e.prefix,t);o[t][n]=new F(n,s,t,e.prefix),l.push(`${i}:${s}`);}}const s=()=>{if(l.length&&!t.rules.themed.cache.has(n)){t.rules.themed.cache.add(n);const i=`${r===e.theme?":root,":""}.${n}{${l.join(";")}}`;t.rules.themed.apply(i);}return n};return {...o,get className(){return s()},selector:i,toString:s}})),Z=l(),X=e=>{let t=!1;const n=Z(e,(e=>{t=!0;const n="prefix"in(e="object"==typeof e&&e||{})?String(e.prefix):"",r="object"==typeof e.media&&e.media||{},o="object"==typeof e.root?e.root||null:globalThis.document||null,l="object"==typeof e.theme&&e.theme||{},s={prefix:n,media:r,theme:l,themeMap:"object"==typeof e.themeMap&&e.themeMap||{...i},utils:"object"==typeof e.utils&&e.utils||{}},a=T(o),c={css:C(s,a),globalCss:N(s,a),keyframes:G(s,a),createTheme:U(s,a),reset(){a.reset(),c.theme.toString();},theme:{},sheet:a,config:s,prefix:n,getCssText:a.toString,toString:a.toString};return String(c.theme=c.createTheme(l)),c}));return t||n.reset(),n};//# sourceMappingUrl=index.map

    const colors = {
        primary: '#228be6',
        white: '#ffffff',
        black: '#000000',
        dark50: '#C1C2C5',
        dark100: '#A6A7AB',
        dark200: '#909296',
        dark300: '#5c5f66',
        dark400: '#373A40',
        dark500: '#2C2E33',
        dark600: '#25262b',
        dark700: '#1A1B1E',
        dark800: '#141517',
        dark900: '#101113',
        gray50: '#f8f9fa',
        gray100: '#f1f3f5',
        gray200: '#e9ecef',
        gray300: '#dee2e6',
        gray400: '#ced4da',
        gray500: '#adb5bd',
        gray600: '#868e96',
        gray700: '#495057',
        gray800: '#343a40',
        gray900: '#212529',
        red50: '#fff5f5',
        red100: '#ffe3e3',
        red200: '#ffc9c9',
        red300: '#ffa8a8',
        red400: '#ff8787',
        red500: '#ff6b6b',
        red600: '#fa5252',
        red700: '#f03e3e',
        red800: '#e03131',
        red900: '#c92a2a',
        pink50: '#fff0f6',
        pink100: '#ffdeeb',
        pink200: '#fcc2d7',
        pink300: '#faa2c1',
        pink400: '#f783ac',
        pink500: '#f06595',
        pink600: '#e64980',
        pink700: '#d6336c',
        pink800: '#c2255c',
        pink900: '#a61e4d',
        grape50: '#f8f0fc',
        grape100: '#f3d9fa',
        grape200: '#eebefa',
        grape300: '#e599f7',
        grape400: '#da77f2',
        grape500: '#cc5de8',
        grape600: '#be4bdb',
        grape700: '#ae3ec9',
        grape800: '#9c36b5',
        grape900: '#862e9c',
        violet50: '#f3f0ff',
        violet100: '#e5dbff',
        violet200: '#d0bfff',
        violet300: '#b197fc',
        violet400: '#9775fa',
        violet500: '#845ef7',
        violet600: '#7950f2',
        violet700: '#7048e8',
        violet800: '#6741d9',
        violet900: '#5f3dc4',
        indigo50: '#edf2ff',
        indigo100: '#dbe4ff',
        indigo200: '#bac8ff',
        indigo300: '#91a7ff',
        indigo400: '#748ffc',
        indigo500: '#5c7cfa',
        indigo600: '#4c6ef5',
        indigo700: '#4263eb',
        indigo800: '#3b5bdb',
        indigo900: '#364fc7',
        blue50: '#e7f5ff',
        blue100: '#d0ebff',
        blue200: '#a5d8ff',
        blue300: '#74c0fc',
        blue400: '#4dabf7',
        blue500: '#339af0',
        blue600: '#228be6',
        blue700: '#1c7ed6',
        blue800: '#1971c2',
        blue900: '#1864ab',
        cyan50: '#e3fafc',
        cyan100: '#c5f6fa',
        cyan200: '#99e9f2',
        cyan300: '#66d9e8',
        cyan400: '#3bc9db',
        cyan500: '#22b8cf',
        cyan600: '#15aabf',
        cyan700: '#1098ad',
        cyan800: '#0c8599',
        cyan900: '#0b7285',
        teal50: '#e6fcf5',
        teal100: '#c3fae8',
        teal200: '#96f2d7',
        teal300: '#63e6be',
        teal400: '#38d9a9',
        teal500: '#20c997',
        teal600: '#12b886',
        teal700: '#0ca678',
        teal800: '#099268',
        teal900: '#087f5b',
        green50: '#ebfbee',
        green100: '#d3f9d8',
        green200: '#b2f2bb',
        green300: '#8ce99a',
        green400: '#69db7c',
        green500: '#51cf66',
        green600: '#40c057',
        green700: '#37b24d',
        green800: '#2f9e44',
        green900: '#2b8a3e',
        lime50: '#f4fce3',
        lime100: '#e9fac8',
        lime200: '#d8f5a2',
        lime300: '#c0eb75',
        lime400: '#a9e34b',
        lime500: '#94d82d',
        lime600: '#82c91e',
        lime700: '#74b816',
        lime800: '#66a80f',
        lime900: '#5c940d',
        yellow50: '#fff9db',
        yellow100: '#fff3bf',
        yellow200: '#ffec99',
        yellow300: '#ffe066',
        yellow400: '#ffd43b',
        yellow500: '#fcc419',
        yellow600: '#fab005',
        yellow700: '#f59f00',
        yellow800: '#f08c00',
        yellow900: '#e67700',
        orange50: '#fff4e6',
        orange100: '#ffe8cc',
        orange200: '#ffd8a8',
        orange300: '#ffc078',
        orange400: '#ffa94d',
        orange500: '#ff922b',
        orange600: '#fd7e14',
        orange700: '#f76707',
        orange800: '#e8590c',
        orange900: '#d9480f'
    };
    const colorNameMap = {
        blue: 'blue',
        cyan: 'cyan',
        dark: 'dark',
        grape: 'grape',
        gray: 'gray',
        green: 'green',
        indigo: 'indigo',
        lime: 'lime',
        orange: 'orange',
        pink: 'pink',
        red: 'red',
        teal: 'teal',
        violet: 'violet',
        yellow: 'yellow'
    };

    const { css, globalCss, keyframes, getCssText, theme, createTheme, config, reset } = X({
        prefix: 'svelteui',
        theme: {
            colors,
            space: {
                0: '0rem',
                xs: 10,
                sm: 12,
                md: 16,
                lg: 20,
                xl: 24,
                xsPX: '10px',
                smPX: '12px',
                mdPX: '16px',
                lgPX: '20px',
                xlPX: '24px',
                1: '0.125rem',
                2: '0.25rem',
                3: '0.375rem',
                4: '0.5rem',
                5: '0.625rem',
                6: '0.75rem',
                7: '0.875rem',
                8: '1rem',
                9: '1.25rem',
                10: '1.5rem',
                11: '1.75rem',
                12: '2rem',
                13: '2.25rem',
                14: '2.5rem',
                15: '2.75rem',
                16: '3rem',
                17: '3.5rem',
                18: '4rem',
                20: '5rem',
                24: '6rem',
                28: '7rem',
                32: '8rem',
                36: '9rem',
                40: '10rem',
                44: '11rem',
                48: '12rem',
                52: '13rem',
                56: '14rem',
                60: '15rem',
                64: '16rem',
                72: '18rem',
                80: '20rem',
                96: '24rem'
            },
            fontSizes: {
                xs: '12px',
                sm: '14px',
                md: '16px',
                lg: '18px',
                xl: '20px'
            },
            fonts: {
                standard: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
                mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
                fallback: 'Segoe UI, system-ui, sans-serif'
            },
            fontWeights: {
                thin: 100,
                extralight: 200,
                light: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
                extrabold: 800
            },
            lineHeights: {
                xs: 1,
                sm: 1.25,
                md: 1.5,
                lg: 1.625,
                xl: 1.75
            },
            letterSpacings: {
                tighter: '-0.05em',
                tight: '-0.025em',
                normal: '0',
                wide: '0.025em',
                wider: '0.05em',
                widest: '0.1em'
            },
            sizes: {},
            radii: {
                xs: '2px',
                sm: '4px',
                md: '8px',
                lg: '16px',
                xl: '32px',
                squared: '33%',
                rounded: '50%',
                pill: '9999px'
            },
            shadows: {
                xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
                sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
                md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
                xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px'
            },
            zIndices: {
                1: '100',
                2: '200',
                3: '300',
                4: '400',
                5: '500',
                10: '1000',
                max: '9999'
            },
            borderWidths: {
                light: '1px',
                normal: '2px',
                bold: '3px',
                extrabold: '4px',
                black: '5px',
                xs: '1px',
                sm: '2px',
                md: '3px',
                lg: '4px',
                xl: '5px'
            },
            breakpoints: {
                xs: 576,
                sm: 768,
                md: 992,
                lg: 1200,
                xl: 1400
            },
            borderStyles: {},
            transitions: {}
        },
        media: {
            xs: '(min-width: 576px)',
            sm: '(min-width: 768px)',
            md: '(min-width: 992px)',
            lg: '(min-width: 1200px)',
            xl: '(min-width: 1400px)'
        },
        utils: {
            focusRing: (value) => ({
                WebkitTapHighlightColor: 'transparent',
                '&:focus': {
                    outlineOffset: 2,
                    outline: value === 'always' || value === 'auto' ? '2px solid $primary' : 'none'
                },
                '&:focus:not(:focus-visible)': {
                    outline: value === 'auto' || value === 'never' ? 'none' : undefined
                }
            }),
            /** padding top */
            p: (value) => ({
                padding: value
            }),
            pt: (value) => ({
                paddingTop: value
            }),
            pr: (value) => ({
                paddingRight: value
            }),
            pb: (value) => ({
                paddingBottom: value
            }),
            pl: (value) => ({
                paddingLeft: value
            }),
            px: (value) => ({
                paddingLeft: value,
                paddingRight: value
            }),
            py: (value) => ({
                paddingTop: value,
                paddingBottom: value
            }),
            /** margin */
            m: (value) => ({
                margin: value
            }),
            /** margin-top */
            mt: (value) => ({
                marginTop: value
            }),
            mr: (value) => ({
                marginRight: value
            }),
            mb: (value) => ({
                marginBottom: value
            }),
            ml: (value) => ({
                marginLeft: value
            }),
            mx: (value) => ({
                marginLeft: value,
                marginRight: value
            }),
            my: (value) => ({
                marginTop: value,
                marginBottom: value
            }),
            ta: (value) => ({
                textAlign: value
            }),
            tt: (value) => ({
                textTransform: value
            }),
            to: (value) => ({
                textOverflow: value
            }),
            d: (value) => ({ display: value }),
            dflex: (value) => ({
                display: 'flex',
                alignItems: value,
                justifyContent: value
            }),
            fd: (value) => ({
                flexDirection: value
            }),
            fw: (value) => ({ flexWrap: value }),
            ai: (value) => ({
                alignItems: value
            }),
            ac: (value) => ({
                alignContent: value
            }),
            jc: (value) => ({
                justifyContent: value
            }),
            as: (value) => ({
                alignSelf: value
            }),
            fg: (value) => ({ flexGrow: value }),
            fs: (value) => ({
                fontSize: value
            }),
            fb: (value) => ({
                flexBasis: value
            }),
            bc: (value) => ({
                backgroundColor: value
            }),
            bf: (value) => ({
                backdropFilter: value
            }),
            bg: (value) => ({
                background: value
            }),
            bgBlur: (value) => ({
                bf: 'saturate(180%) blur(10px)',
                bg: value
            }),
            bgColor: (value) => ({
                backgroundColor: value
            }),
            backgroundClip: (value) => ({
                WebkitBackgroundClip: value,
                backgroundClip: value
            }),
            bgClip: (value) => ({
                WebkitBackgroundClip: value,
                backgroundClip: value
            }),
            br: (value) => ({
                borderRadius: value
            }),
            bw: (value) => ({
                borderWidth: value
            }),
            btrr: (value) => ({
                borderTopRightRadius: value
            }),
            bbrr: (value) => ({
                borderBottomRightRadius: value
            }),
            bblr: (value) => ({
                borderBottomLeftRadius: value
            }),
            btlr: (value) => ({
                borderTopLeftRadius: value
            }),
            bs: (value) => ({
                boxShadow: value
            }),
            normalShadow: (value) => ({
                boxShadow: `0 4px 14px 0 $${value}`
            }),
            lh: (value) => ({
                lineHeight: value
            }),
            ov: (value) => ({ overflow: value }),
            ox: (value) => ({
                overflowX: value
            }),
            oy: (value) => ({
                overflowY: value
            }),
            pe: (value) => ({
                pointerEvents: value
            }),
            events: (value) => ({
                pointerEvents: value
            }),
            us: (value) => ({
                WebkitUserSelect: value,
                userSelect: value
            }),
            userSelect: (value) => ({
                WebkitUserSelect: value,
                userSelect: value
            }),
            w: (value) => ({ width: value }),
            h: (value) => ({
                height: value
            }),
            minW: (value) => ({
                minWidth: value
            }),
            minH: (value) => ({
                minWidth: value
            }),
            mw: (value) => ({
                maxWidth: value
            }),
            maxW: (value) => ({
                maxWidth: value
            }),
            mh: (value) => ({
                maxHeight: value
            }),
            maxH: (value) => ({
                maxHeight: value
            }),
            size: (value) => ({
                width: value,
                height: value
            }),
            minSize: (value) => ({
                minWidth: value,
                minHeight: value,
                width: value,
                height: value
            }),
            sizeMin: (value) => ({
                minWidth: value,
                minHeight: value,
                width: value,
                height: value
            }),
            maxSize: (value) => ({
                maxWidth: value,
                maxHeight: value
            }),
            sizeMax: (value) => ({
                maxWidth: value,
                maxHeight: value
            }),
            appearance: (value) => ({
                WebkitAppearance: value,
                appearance: value
            }),
            scale: (value) => ({
                transform: `scale(${value})`
            }),
            linearGradient: (value) => ({
                backgroundImage: `linear-gradient(${value})`
            }),
            tdl: (value) => ({
                textDecorationLine: value
            }),
            // Text gradient effect
            textGradient: (value) => ({
                backgroundImage: `linear-gradient(${value})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            })
        },
        themeMap: {
            ...i,
            width: 'space',
            height: 'space',
            minWidth: 'space',
            maxWidth: 'space',
            minHeight: 'space',
            maxHeight: 'space',
            flexBasis: 'space',
            gridTemplateColumns: 'space',
            gridTemplateRows: 'space',
            blockSize: 'space',
            minBlockSize: 'space',
            maxBlockSize: 'space',
            inlineSize: 'space',
            minInlineSize: 'space',
            maxInlineSize: 'space',
            borderWidth: 'borderWeights'
        }
    });
    /** Function for dark theme */
    const dark = createTheme('dark-theme', {
        colors,
        shadows: {
            xs: '-4px 0 15px rgb(0 0 0 / 50%)',
            sm: '0 5px 20px -5px rgba(20, 20, 20, 0.1)',
            md: '0 8px 30px rgba(20, 20, 20, 0.15)',
            lg: '0 30px 60px rgba(20, 20, 20, 0.15)',
            xl: '0 40px 80px rgba(20, 20, 20, 0.25)'
        }
    });
    /** Global styles for SvelteUI */
    const SvelteUIGlobalCSS = globalCss({
        a: {
            focusRing: 'auto'
        },
        body: {
            [`${dark.selector} &`]: {
                backgroundColor: '$dark700',
                color: '$dark50'
            },
            backgroundColor: '$white',
            color: '$black'
        }
    });
    /** Normalize css function */
    const NormalizeCSS = globalCss({
        html: {
            fontFamily: 'sans-serif',
            lineHeight: '1.15',
            textSizeAdjust: '100%',
            margin: 0
        },
        body: {
            margin: 0
        },
        'article, aside, footer, header, nav, section, figcaption, figure, main': {
            display: 'block'
        },
        h1: {
            fontSize: '2em',
            margin: 0
        },
        hr: {
            boxSizing: 'content-box',
            height: 0,
            overflow: 'visible'
        },
        pre: {
            fontFamily: 'monospace, monospace',
            fontSize: '1em'
        },
        a: {
            background: 'transparent',
            textDecorationSkip: 'objects'
        },
        'a:active, a:hover': {
            outlineWidth: 0
        },
        'abbr[title]': {
            borderBottom: 'none',
            textDecoration: 'underline'
        },
        'b, strong': {
            fontWeight: 'bolder'
        },
        'code, kbp, samp': {
            fontFamily: 'monospace, monospace',
            fontSize: '1em'
        },
        dfn: {
            fontStyle: 'italic'
        },
        mark: {
            backgroundColor: '#ff0',
            color: '#000'
        },
        small: {
            fontSize: '80%'
        },
        'sub, sup': {
            fontSize: '75%',
            lineHeight: 0,
            position: 'relative',
            verticalAlign: 'baseline'
        },
        sup: {
            top: '-0.5em'
        },
        sub: {
            bottom: '-0.25em'
        },
        'audio, video': {
            display: 'inline-block'
        },
        'audio:not([controls])': {
            display: 'none',
            height: 0
        },
        img: {
            borderStyle: 'none',
            verticalAlign: 'middle'
        },
        'svg:not(:root)': {
            overflow: 'hidden'
        },
        'button, input, optgroup, select, textarea': {
            fontFamily: 'sans-serif',
            fontSize: '100%',
            lineHeight: '1.15',
            margin: 0
        },
        'button, input': {
            overflow: 'visible'
        },
        'button, select': {
            textTransform: 'none'
        },
        'button, [type=reset], [type=submit]': {
            WebkitAppearance: 'button'
        },
        'button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner': {
            borderStyle: 'none',
            padding: 0
        },
        'button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring': {
            outline: '1px dotted ButtonText'
        },
        legend: {
            boxSizing: 'border-box',
            color: 'inherit',
            display: 'table',
            maxWidth: '100%',
            padding: 0,
            whiteSpace: 'normal'
        },
        progress: {
            display: 'inline-block',
            verticalAlign: 'baseline'
        },
        textarea: {
            overflow: 'auto'
        },
        '[type=checkbox], [type=radio]': {
            boxSizing: 'border-box',
            padding: 0
        },
        '[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button': {
            height: 'auto'
        },
        '[type=search]': {
            appearance: 'textfield',
            outlineOffset: '-2px'
        },
        '[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration': {
            appearance: 'none'
        },
        '::-webkit-file-upload-button': {
            appearance: 'button',
            font: 'inherit'
        },
        'details, menu': {
            display: 'block'
        },
        summary: {
            display: 'list-item'
        },
        canvas: {
            display: 'inline-block'
        },
        template: {
            display: 'none'
        },
        '[hidden]': {
            display: 'none'
        }
    });

    function themeColor(color, shade = 0) {
        const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
        let _shade = '50';
        if (!isSvelteUIColor(color))
            return color;
        if (shade !== Number(0))
            _shade = `${shade.toString()}00`;
        return theme.colors[`${color}${_shade}`]?.value;
    }
    function isSvelteUIColor(color) {
        let valid = false;
        switch (color) {
            case 'dark':
                valid = true;
                break;
            case 'gray':
                valid = true;
                break;
            case 'red':
                valid = true;
                break;
            case 'pink':
                valid = true;
                break;
            case 'grape':
                valid = true;
                break;
            case 'violet':
                valid = true;
                break;
            case 'indigo':
                valid = true;
                break;
            case 'blue':
                valid = true;
                break;
            case 'cyan':
                valid = true;
                break;
            case 'teal':
                valid = true;
                break;
            case 'green':
                valid = true;
                break;
            case 'lime':
                valid = true;
                break;
            case 'yellow':
                valid = true;
                break;
            case 'orange':
                valid = true;
                break;
            default:
                valid = false;
                break;
        }
        return valid;
    }

    function createConverter(units) {
        return (px) => {
            if (typeof px === 'number') {
                return `${px / 16}${units}`;
            }
            if (typeof px === 'string') {
                const replaced = px.replace('px', '');
                if (!Number.isNaN(Number(replaced))) {
                    return `${Number(replaced) / 16}${units}`;
                }
            }
            return px;
        };
    }
    const rem = createConverter('rem');

    function cover(offset = 0) {
        return {
            position: 'absolute',
            top: rem(offset),
            right: rem(offset),
            left: rem(offset),
            bottom: rem(offset)
        };
    }

    function size(props) {
        if (typeof props.size === 'number') {
            return props.size;
        }
        if (typeof props.sizes[props.size] === 'number') {
            return props.sizes[props.size];
        }
        return +props.sizes[props.size]?.value || +props.sizes.md?.value;
    }

    function radius(radii) {
        const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
        if (typeof radii === 'number') {
            return radii;
        }
        return theme.radii[radii].value;
    }

    function isHexColor(hex) {
        const replaced = hex.replace('#', '');
        return (typeof replaced === 'string' && replaced.length === 6 && !Number.isNaN(Number(`0x${replaced}`)));
    }
    function hexToRgba(color) {
        const replaced = color.replace('#', '');
        const parsed = parseInt(replaced, 16);
        const r = (parsed >> 16) & 255;
        const g = (parsed >> 8) & 255;
        const b = parsed & 255;
        return {
            r,
            g,
            b,
            a: 1
        };
    }
    function rgbStringToRgba(color) {
        const [r, g, b, a] = color
            .replace(/[^0-9,.]/g, '')
            .split(',')
            .map(Number);
        return { r, g, b, a: a || 1 };
    }
    function toRgba(color) {
        if (isHexColor(color)) {
            return hexToRgba(color);
        }
        if (color.startsWith('rgb')) {
            return rgbStringToRgba(color);
        }
        return {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        };
    }

    function rgba$1(color, alpha = 1) {
        if (typeof color !== 'string' || alpha > 1 || alpha < 0) {
            return 'rgba(0, 0, 0, 1)';
        }
        const { r, g, b } = toRgba(color);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const DEFAULT_GRADIENT = {
        from: 'indigo',
        to: 'cyan',
        deg: 45
    };
    /**
     * THe Variant function is a function that takes a variant, optional color/gradient and returns the desired styles for four specific properties.
     *
     * Some styles will return tuples of strings where the first value is the dark version of the specific style, and the second value is the light version.
     *
     * @param VariantInput - an object that has a variant, color, and optional gradient property
     * @returns an object with border, background, color, and hover property styles based on the variant
     */
    function variant({ variant, color, gradient }) {
        const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
        const primaryShade = 6;
        if (variant === 'light') {
            return {
                border: 'transparent',
                background: [rgba$1(themeColor(color, 8), 0.35), rgba$1(themeColor(color, 0), 1)],
                color: [
                    color === 'dark' ? themeColor('dark', 0) : themeColor(color, 2),
                    color === 'dark' ? themeColor('dark', 9) : themeColor(color, primaryShade)
                ],
                // themeColor(color, theme.colorScheme === 'dark' ? 2 : getPrimaryShade('light')),
                hover: [rgba$1(themeColor(color, 7), 0.45), rgba$1(themeColor(color, 1), 0.65)]
            };
        }
        if (variant === 'default') {
            return {
                border: [themeColor('dark', 5), themeColor('gray', 4)],
                background: [themeColor('dark', 5), theme.colors.white.value],
                color: [theme.colors.white.value, theme.colors.black.value],
                hover: [themeColor('dark', 4), themeColor('gray', 0)]
            };
        }
        if (variant === 'white') {
            return {
                border: 'transparent',
                background: theme.colors.white.value,
                color: themeColor(color, primaryShade),
                hover: null
            };
        }
        if (variant === 'outline') {
            return {
                border: [themeColor(color, 4), themeColor(color, primaryShade)],
                background: 'transparent',
                color: [themeColor(color, 4), themeColor(color, primaryShade)],
                hover: [rgba$1(themeColor(color, 4), 0.05), rgba$1(themeColor(color, 0), 0.35)]
            };
        }
        if (variant === 'gradient') {
            const merged = {
                from: gradient?.from || DEFAULT_GRADIENT.from,
                to: gradient?.to || DEFAULT_GRADIENT.to,
                deg: gradient?.deg || DEFAULT_GRADIENT.deg
            };
            return {
                background: `linear-gradient(${merged.deg}deg, ${themeColor(merged.from, primaryShade)} 0%, ${themeColor(merged.to, primaryShade)} 100%)`,
                color: theme.colors.white.value,
                border: 'transparent',
                hover: null
            };
        }
        if (variant === 'subtle') {
            return {
                border: 'transparent',
                background: 'transparent',
                color: [
                    color === 'dark' ? themeColor('dark', 0) : themeColor(color, 2),
                    color === 'dark' ? themeColor('dark', 9) : themeColor(color, primaryShade)
                ],
                hover: [rgba$1(themeColor(color, 8), 0.35), rgba$1(themeColor(color, 0), 1)]
            };
        }
        return {
            border: 'transparent',
            background: [themeColor(color, 8), themeColor(color, primaryShade)],
            color: theme.colors.white.value,
            hover: themeColor(color, 7)
        };
    }

    const fns = {
        cover,
        size,
        radius,
        themeColor,
        variant,
        rgba: rgba$1
    };

    /* eslint-disable @typescript-eslint/ban-ts-comment */
    function useSvelteUITheme() {
        let observer;
        colorScheme?.subscribe((mode) => {
            observer = mode;
        });
        const DEFAULT_THEME = {
            // @ts-ignore
            ...theme,
            colorNames: colorNameMap,
            colorScheme: observer,
            dark: dark?.selector,
            fn: {
                cover: fns.cover,
                themeColor: fns.themeColor,
                size: fns.size,
                radius: fns.radius,
                rgba: fns.rgba,
                variant: fns.variant
            }
        };
        return DEFAULT_THEME;
    }

    /* ../node_modules/@svelteuidev/core/dist/styles/theme/SvelteUIProvider/SvelteUIProvider.svelte generated by Svelte v3.59.2 */
    const file$m = "../node_modules/@svelteuidev/core/dist/styles/theme/SvelteUIProvider/SvelteUIProvider.svelte";

    function create_fragment$C(ctx) {
    	let div;
    	let div_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

    	let div_levels = [
    		{ id: "SVELTEUI_PROVIDER" },
    		{
    			class: div_class_value = /*cx*/ ctx[5](/*className*/ ctx[2], /*classes*/ ctx[4].root, /*currentTheme*/ ctx[3])
    		},
    		/*$$restProps*/ ctx[7]
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$m, 49, 0, 1954);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[20](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[1])),
    					action_destroyer(/*forwardEvents*/ ctx[6].call(null, div))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				{ id: "SVELTEUI_PROVIDER" },
    				(!current || dirty & /*cx, className, classes, currentTheme*/ 60 && div_class_value !== (div_class_value = /*cx*/ ctx[5](/*className*/ ctx[2], /*classes*/ ctx[4].root, /*currentTheme*/ ctx[3]))) && { class: div_class_value },
    				dirty & /*$$restProps*/ 128 && /*$$restProps*/ ctx[7]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[20](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props, $$invalidate) {
    	let overrides;
    	let mergedTheme;
    	let cx;
    	let classes;

    	const omit_props_names = [
    		"use","class","element","theme","styles","defaultProps","themeObserver","withNormalizeCSS","withGlobalStyles","override","inherit"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $colorScheme;
    	validate_store(colorScheme, 'colorScheme');
    	component_subscribe($$self, colorScheme, $$value => $$invalidate(21, $colorScheme = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SvelteUIProvider', slots, ['default']);
    	let { use = [], class: className = '', element = undefined, theme = useSvelteUITheme(), styles = {}, defaultProps = {}, themeObserver = 'light', withNormalizeCSS = false, withGlobalStyles = false, override = {}, inherit = false } = $$props;

    	beforeUpdate(() => {
    		const htmlClassList = document.documentElement.classList;
    		if ($colorScheme === 'dark') htmlClassList.add(dark.className);
    		if ($colorScheme === 'light') htmlClassList.remove(dark.className);
    	});

    	const ctx = useSvelteUIThemeContext();
    	const useStyles = createStyles(() => ({ root: {} }));
    	const forwardEvents = createEventForwarder(get_current_component());
    	const DEFAULT_THEME = useSvelteUITheme();
    	let currentTheme = null;

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('theme' in $$new_props) $$invalidate(8, theme = $$new_props.theme);
    		if ('styles' in $$new_props) $$invalidate(9, styles = $$new_props.styles);
    		if ('defaultProps' in $$new_props) $$invalidate(10, defaultProps = $$new_props.defaultProps);
    		if ('themeObserver' in $$new_props) $$invalidate(11, themeObserver = $$new_props.themeObserver);
    		if ('withNormalizeCSS' in $$new_props) $$invalidate(12, withNormalizeCSS = $$new_props.withNormalizeCSS);
    		if ('withGlobalStyles' in $$new_props) $$invalidate(13, withGlobalStyles = $$new_props.withGlobalStyles);
    		if ('override' in $$new_props) $$invalidate(14, override = $$new_props.override);
    		if ('inherit' in $$new_props) $$invalidate(15, inherit = $$new_props.inherit);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		beforeUpdate,
    		get_current_component,
    		mergeTheme,
    		useSvelteUITheme,
    		colorScheme,
    		key,
    		useSvelteUIThemeContext,
    		createStyles,
    		dark,
    		NormalizeCSS,
    		SvelteUIGlobalCSS,
    		createEventForwarder,
    		useActions,
    		use,
    		className,
    		element,
    		theme,
    		styles,
    		defaultProps,
    		themeObserver,
    		withNormalizeCSS,
    		withGlobalStyles,
    		override,
    		inherit,
    		ctx,
    		useStyles,
    		forwardEvents,
    		DEFAULT_THEME,
    		currentTheme,
    		classes,
    		cx,
    		overrides,
    		mergedTheme,
    		$colorScheme
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('theme' in $$props) $$invalidate(8, theme = $$new_props.theme);
    		if ('styles' in $$props) $$invalidate(9, styles = $$new_props.styles);
    		if ('defaultProps' in $$props) $$invalidate(10, defaultProps = $$new_props.defaultProps);
    		if ('themeObserver' in $$props) $$invalidate(11, themeObserver = $$new_props.themeObserver);
    		if ('withNormalizeCSS' in $$props) $$invalidate(12, withNormalizeCSS = $$new_props.withNormalizeCSS);
    		if ('withGlobalStyles' in $$props) $$invalidate(13, withGlobalStyles = $$new_props.withGlobalStyles);
    		if ('override' in $$props) $$invalidate(14, override = $$new_props.override);
    		if ('inherit' in $$props) $$invalidate(15, inherit = $$new_props.inherit);
    		if ('currentTheme' in $$props) $$invalidate(3, currentTheme = $$new_props.currentTheme);
    		if ('classes' in $$props) $$invalidate(4, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(5, cx = $$new_props.cx);
    		if ('overrides' in $$props) $$invalidate(16, overrides = $$new_props.overrides);
    		if ('mergedTheme' in $$props) $$invalidate(17, mergedTheme = $$new_props.mergedTheme);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*inherit, theme, styles, defaultProps*/ 34560) {
    			$$invalidate(16, overrides = {
    				themeOverride: inherit ? { ...ctx.theme, ...theme } : theme,
    				styles: inherit ? { ...ctx.styles, ...styles } : styles,
    				defaultProps: inherit
    				? { ...ctx.styles, ...defaultProps }
    				: defaultProps
    			});
    		}

    		if ($$self.$$.dirty & /*overrides*/ 65536) {
    			$$invalidate(17, mergedTheme = mergeTheme(DEFAULT_THEME, overrides.themeOverride));
    		}

    		if ($$self.$$.dirty & /*themeObserver, mergedTheme*/ 133120) {
    			{
    				if (themeObserver !== null) {
    					$$invalidate(3, currentTheme = themeObserver === 'light' ? mergedTheme : dark);
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*withGlobalStyles*/ 8192) {
    			if (withGlobalStyles) SvelteUIGlobalCSS();
    		}

    		if ($$self.$$.dirty & /*withNormalizeCSS*/ 4096) {
    			if (withNormalizeCSS) NormalizeCSS();
    		}

    		if ($$self.$$.dirty & /*overrides*/ 65536) {
    			setContext(key, {
    				theme: overrides.themeOverride,
    				styles: {},
    				defaultProps: {}
    			});
    		}

    		if ($$self.$$.dirty & /*themeObserver*/ 2048) {
    			colorScheme.set(themeObserver);
    		}

    		if ($$self.$$.dirty & /*override*/ 16384) {
    			$$invalidate(5, { cx, classes } = useStyles(null, { override }), cx, ($$invalidate(4, classes), $$invalidate(14, override)));
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		currentTheme,
    		classes,
    		cx,
    		forwardEvents,
    		$$restProps,
    		theme,
    		styles,
    		defaultProps,
    		themeObserver,
    		withNormalizeCSS,
    		withGlobalStyles,
    		override,
    		inherit,
    		overrides,
    		mergedTheme,
    		$$scope,
    		slots,
    		div_binding
    	];
    }

    class SvelteUIProvider extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$C, create_fragment$C, safe_not_equal, {
    			use: 1,
    			class: 2,
    			element: 0,
    			theme: 8,
    			styles: 9,
    			defaultProps: 10,
    			themeObserver: 11,
    			withNormalizeCSS: 12,
    			withGlobalStyles: 13,
    			override: 14,
    			inherit: 15
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SvelteUIProvider",
    			options,
    			id: create_fragment$C.name
    		});
    	}

    	get use() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get theme() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set theme(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get styles() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set styles(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get defaultProps() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set defaultProps(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get themeObserver() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set themeObserver(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get withNormalizeCSS() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set withNormalizeCSS(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get withGlobalStyles() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set withGlobalStyles(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inherit() {
    		throw new Error("<SvelteUIProvider>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inherit(value) {
    		throw new Error("<SvelteUIProvider>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var SvelteUIProvider$1 = SvelteUIProvider;

    const vFunc = (color, gradient) => {
        const { themeColor, rgba } = fns;
        const variants = {
            /** Filled variant */
            filled: {
                [`${dark.selector} &`]: {
                    backgroundColor: themeColor(color, 8)
                },
                border: 'transparent',
                backgroundColor: themeColor(color, 6),
                color: 'White',
                '&:hover': { backgroundColor: themeColor(color, 7) }
            },
            /** Light variant */
            light: {
                [`${dark.selector} &`]: {
                    backgroundColor: rgba(themeColor(color, 8), 0.35),
                    color: color === 'dark' ? themeColor('dark', 0) : themeColor(color, 2),
                    '&:hover': { backgroundColor: rgba(themeColor(color, 7), 0.45) }
                },
                border: 'transparent',
                backgroundColor: themeColor(color, 0),
                color: color === 'dark' ? themeColor('dark', 9) : themeColor(color, 6),
                '&:hover': { backgroundColor: themeColor(color, 1) }
            },
            /** Outline variant */
            outline: {
                [`${dark.selector} &`]: {
                    border: `1px solid ${themeColor(color, 4)}`,
                    color: `${themeColor(color, 4)}`,
                    '&:hover': { backgroundColor: rgba(themeColor(color, 4), 0.05) }
                },
                border: `1px solid ${themeColor(color, 7)}`,
                backgroundColor: 'transparent',
                color: themeColor(color, 7),
                '&:hover': {
                    backgroundColor: rgba(themeColor(color, 0), 0.35)
                }
            },
            /** Subtle variant */
            subtle: {
                [`${dark.selector} &`]: {
                    color: color === 'dark' ? themeColor('dark', 0) : themeColor(color, 2),
                    '&:hover': { backgroundColor: rgba(themeColor(color, 8), 0.35) }
                },
                border: 'transparent',
                backgroundColor: 'transparent',
                color: color === 'dark' ? themeColor('dark', 9) : themeColor(color, 6),
                '&:hover': {
                    backgroundColor: themeColor(color, 0)
                }
            },
            /** Default variant */
            default: {
                [`${dark.selector} &`]: {
                    border: `1px solid ${themeColor('dark', 5)}`,
                    backgroundColor: themeColor('dark', 5),
                    color: 'White',
                    '&:hover': { backgroundColor: themeColor('dark', 4) }
                },
                border: `1px solid ${themeColor('gray', 4)}`,
                backgroundColor: 'White',
                color: 'Black',
                '&:hover': { backgroundColor: themeColor('gray', 0) }
            },
            /** White variant */
            white: {
                border: 'transparent',
                backgroundColor: 'White',
                color: themeColor(color, 7),
                '&:hover': { backgroundColor: 'White' }
            },
            gradient: {}
        };
        if (gradient) {
            /** Gradient variant */
            variants.gradient = {
                border: 'transparent',
                background: `linear-gradient(${gradient.deg}deg, $${gradient.from}600 0%, $${gradient.to}600 100%)`,
                color: 'White'
            };
        }
        return variants;
    };

    function randomID(prefix = 'svelteui') {
        return `${prefix}-${Math.random().toString(36).substring(2, 10)}`;
    }

    function mergeTheme(currentTheme, themeOverride) {
        if (!themeOverride) {
            return currentTheme;
        }
        return Object.keys(currentTheme).reduce((acc, key) => {
            acc[key] =
                typeof themeOverride[key] === 'object'
                    ? { ...currentTheme[key], ...themeOverride[key] }
                    : typeof themeOverride[key] === 'number'
                        ? themeOverride[key]
                        : themeOverride[key] || currentTheme[key];
            return acc;
        }, {});
    }

    const hasOwn = {}.hasOwnProperty;
    function cx(...args) {
        const classes = [];
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (!arg)
                continue;
            const argType = typeof arg;
            if (argType === 'string' || argType === 'number') {
                classes.push(arg);
            }
            else if (Array.isArray(arg)) {
                if (arg.length) {
                    const inner = { ...arg };
                    if (inner) {
                        classes.push(inner);
                    }
                }
            }
            else if (argType === 'object') {
                if (arg.toString === Object.prototype.toString) {
                    for (const key in arg) {
                        if (hasOwn.call(arg, key) && arg[key]) {
                            classes.push(key);
                        }
                    }
                }
                else {
                    classes.push(arg.toString());
                }
            }
        }
        return classes.join(' ');
    }
    function cssFactory() {
        // This is a factory function to allow for scalability
        return { cx };
    }

    function fromEntries(entries) {
        const o = {};
        Object.keys(entries).forEach((key) => {
            const [k, v] = entries[key];
            o[k] = v;
        });
        return o;
    }

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const CLASS_KEY = 'svelteui';
    function createRef(refName) {
        return `__svelteui-ref-${refName || ''}`;
    }
    /**
     * Sanitizes the provided CSS object, converting certain keywords to
     * respective CSS selectors, transforms keys into generated CSS classes
     * and returns the mapping between these generated classes and their initial
     * keys.
     *
     * @param object The CSS object that has not yet been sanitized.
     * @param theme The current theme object.
     * @param ref The ref object.
     * @returns The class map that maps the name of the key in the CSS object
     * and the generated hash class.
     */
    function sanitizeCss(object, theme) {
        // builds this to map the generated class name to the class key
        // given in the CSS object
        const refs = [];
        const classMap = {};
        const _sanitizeVariants = (obj) => {
            const variantsObject = obj.variation ?? obj;
            const variants = Object.keys(variantsObject);
            for (const variant of variants) {
                _sanitize(variantsObject[variant]);
            }
        };
        const _sanitize = (obj) => {
            Object.keys(obj).map((value) => {
                // transforms certain keywords into the correct CSS selectors
                if (value === 'variants') {
                    _sanitizeVariants(obj[value]);
                    return;
                }
                // saves the reference value so that later it can be added
                // to reference the CSS selector
                if (value === 'ref') {
                    refs.push(obj.ref);
                }
                if (value === 'darkMode') {
                    obj[`${theme.dark} &`] = obj.darkMode;
                }
                // returns the recursive call if the CSS is not an object
                if (obj[value] === null || typeof obj[value] !== 'object')
                    return;
                // calls the sanitize method recursively so that it can sanitize
                // all the style objects
                _sanitize(obj[value]);
                // removes the darkMode style since it has been switched
                // to the correct CSS selector
                if (value === 'darkMode') {
                    delete obj[value];
                }
                else if (value.startsWith('@media')) ;
                // only adds the correct selectors if it has none
                else if (!value.startsWith('&') && !value.startsWith(theme.dark)) {
                    const getStyles = css(obj[value]);
                    classMap[value] = getStyles().toString();
                    obj[`& .${getStyles().toString()}`] = obj[value];
                    delete obj[value];
                }
            });
        };
        _sanitize(object);
        // deletes the root key since it won't be sanitized here
        delete object['& .root'];
        return { classMap, refs: Array.from(new Set(refs)) };
    }
    function createStyles(input) {
        const getCssObject = typeof input === 'function' ? input : () => input;
        function useStyles(params = {}, options) {
            // uses the theme present in the current context or fallbacks to the default theme
            const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
            const { cx } = cssFactory();
            const { override, name } = options || {};
            const dirtyCssObject = getCssObject(theme, params, createRef);
            // builds the CSS object that contains transformed values
            const sanitizedCss = Object.assign({}, dirtyCssObject);
            const { classMap, refs } = sanitizeCss(sanitizedCss, theme);
            const root = dirtyCssObject['root'] ?? undefined;
            const cssObjectClean = root !== undefined ? { ...root, ...sanitizedCss } : dirtyCssObject;
            const getStyles = css(cssObjectClean);
            // transforms the keys into strings to be consumed by the classes
            const classes = fromEntries(Object.keys(dirtyCssObject).map((keys) => {
                const ref = refs.find((r) => r.includes(keys)) ?? '';
                const getRefName = ref?.split('-') ?? [];
                const keyIsRef = ref?.split('-')[getRefName?.length - 1] === keys;
                const value = keys.toString();
                let transformedClasses = classMap[value] ?? value;
                // add the value to the array if the ref provided is valid
                if (ref && keyIsRef) {
                    transformedClasses = `${transformedClasses} ${ref}`;
                }
                // generates the root styles, applying the override styles
                if (keys === 'root') {
                    transformedClasses = getStyles({ css: override }).toString();
                }
                // adds a custom class that can be used to override style
                let libClass = `${CLASS_KEY}-${keys.toString()}`;
                if (name) {
                    libClass = `${CLASS_KEY}-${name}-${keys.toString()}`;
                    transformedClasses = `${transformedClasses} ${libClass}`;
                }
                return [keys, transformedClasses];
            }));
            return {
                cx,
                theme,
                classes,
                getStyles: css(cssObjectClean)
            };
        }
        return useStyles;
    }

    const SYSTEM_PROPS = {
        mt: 'marginTop',
        mb: 'marginBottom',
        ml: 'marginLeft',
        mr: 'marginRight',
        pt: 'paddingTop',
        pb: 'paddingBottom',
        pl: 'paddingLeft',
        pr: 'paddingRight'
    };
    const NEGATIVE_VALUES = ['-xs', '-sm', '-md', '-lg', '-xl'];
    function isValidSizeValue(margin) {
        return typeof margin === 'string' || typeof margin === 'number';
    }
    function getSizeValue(margin, theme) {
        if (NEGATIVE_VALUES.includes(margin)) {
            return theme.fn.size({ size: margin.replace('-', ''), sizes: theme.space }) * -1;
        }
        return theme.fn.size({ size: margin, sizes: theme.space });
    }
    function getSystemStyles(systemStyles, theme) {
        const styles = {};
        if (isValidSizeValue(systemStyles.p)) {
            const value = getSizeValue(systemStyles.p, theme);
            styles.padding = value;
        }
        if (isValidSizeValue(systemStyles.m)) {
            const value = getSizeValue(systemStyles.m, theme);
            styles.margin = value;
        }
        if (isValidSizeValue(systemStyles.py)) {
            const value = getSizeValue(systemStyles.py, theme);
            styles.paddingTop = value;
            styles.paddingBottom = value;
        }
        if (isValidSizeValue(systemStyles.px)) {
            const value = getSizeValue(systemStyles.px, theme);
            styles.paddingLeft = value;
            styles.paddingRight = value;
        }
        if (isValidSizeValue(systemStyles.my)) {
            const value = getSizeValue(systemStyles.my, theme);
            styles.marginTop = value;
            styles.marginBottom = value;
        }
        if (isValidSizeValue(systemStyles.mx)) {
            const value = getSizeValue(systemStyles.mx, theme);
            styles.marginLeft = value;
            styles.marginRight = value;
        }
        Object.keys(SYSTEM_PROPS).forEach((property) => {
            if (isValidSizeValue(systemStyles[property])) {
                styles[SYSTEM_PROPS[property]] = theme.fn.size({
                    size: getSizeValue(systemStyles[property], theme),
                    sizes: theme.space
                });
            }
        });
        return styles;
    }

    /* ../node_modules/@svelteuidev/core/dist/components/Box/Box.svelte generated by Svelte v3.59.2 */
    const file$l = "../node_modules/@svelteuidev/core/dist/components/Box/Box.svelte";

    // (74:0) {:else}
    function create_else_block$a(ctx) {
    	let div;
    	let div_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[28].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

    	let div_levels = [
    		{
    			class: div_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    				css: {
    					.../*getCSSStyles*/ ctx[8](/*theme*/ ctx[11]),
    					.../*systemStyles*/ ctx[6]
    				}
    			}))
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$l, 74, 1, 2266);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[31](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*forwardEvents*/ ctx[9].call(null, div)),
    					action_destroyer(useActions_action = useActions.call(null, div, /*use*/ ctx[1]))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[32],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[32])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[32], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				(!current || dirty[0] & /*className, BoxStyles, getCSSStyles, systemStyles*/ 452 && div_class_value !== (div_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    					css: {
    						.../*getCSSStyles*/ ctx[8](/*theme*/ ctx[11]),
    						.../*systemStyles*/ ctx[6]
    					}
    				})))) && { class: div_class_value },
    				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[31](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$a.name,
    		type: "else",
    		source: "(74:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (64:50) 
    function create_if_block_1$a(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			use: [/*forwardEvents*/ ctx[9], [useActions, /*use*/ ctx[1]]]
    		},
    		{
    			class: "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    				css: {
    					.../*getCSSStyles*/ ctx[8](/*theme*/ ctx[11]),
    					.../*systemStyles*/ ctx[6]
    				}
    			}))
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	var switch_value = /*root*/ ctx[3];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot$q] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    		/*switch_instance_binding*/ ctx[30](switch_instance);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty[0] & /*forwardEvents, use, className, BoxStyles, getCSSStyles, theme, systemStyles, $$restProps*/ 7110)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty[0] & /*forwardEvents, use*/ 514 && {
    						use: [/*forwardEvents*/ ctx[9], [useActions, /*use*/ ctx[1]]]
    					},
    					dirty[0] & /*className, BoxStyles, getCSSStyles, theme, systemStyles*/ 2500 && {
    						class: "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    							css: {
    								.../*getCSSStyles*/ ctx[8](/*theme*/ ctx[11]),
    								.../*systemStyles*/ ctx[6]
    							}
    						}))
    					},
    					dirty[0] & /*$$restProps*/ 4096 && get_spread_object(/*$$restProps*/ ctx[12])
    				])
    			: {};

    			if (dirty[1] & /*$$scope*/ 2) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (dirty[0] & /*root*/ 8 && switch_value !== (switch_value = /*root*/ ctx[3])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					/*switch_instance_binding*/ ctx[30](switch_instance);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*switch_instance_binding*/ ctx[30](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$a.name,
    		type: "if",
    		source: "(64:50) ",
    		ctx
    	});

    	return block;
    }

    // (52:0) {#if isHTMLElement}
    function create_if_block$i(ctx) {
    	let current;
    	validate_dynamic_element(/*castRoot*/ ctx[10]());
    	validate_void_dynamic_element(/*castRoot*/ ctx[10]());
    	let svelte_element = /*castRoot*/ ctx[10]() && create_dynamic_element$1(ctx);

    	const block = {
    		c: function create() {
    			if (svelte_element) svelte_element.c();
    		},
    		m: function mount(target, anchor) {
    			if (svelte_element) svelte_element.m(target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*castRoot*/ ctx[10]()) {
    				svelte_element.p(ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svelte_element);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svelte_element);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (svelte_element) svelte_element.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$i.name,
    		type: "if",
    		source: "(52:0) {#if isHTMLElement}",
    		ctx
    	});

    	return block;
    }

    // (65:1) <svelte:component   this={root}   bind:this={element}   use={[forwardEvents, [useActions, use]]}   class="{className} {BoxStyles({ css: { ...getCSSStyles(theme), ...systemStyles } })}"   {...$$restProps}  >
    function create_default_slot$q(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[28].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[32],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[32])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[32], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$q.name,
    		type: "slot",
    		source: "(65:1) <svelte:component   this={root}   bind:this={element}   use={[forwardEvents, [useActions, use]]}   class=\\\"{className} {BoxStyles({ css: { ...getCSSStyles(theme), ...systemStyles } })}\\\"   {...$$restProps}  >",
    		ctx
    	});

    	return block;
    }

    // (54:1) <svelte:element   bind:this={element}   this={castRoot()}   use:forwardEvents   use:useActions={use}   class="{className} {BoxStyles({ css: {...getCSSStyles(theme), ...systemStyles} })}"   {...$$restProps}  >
    function create_dynamic_element$1(ctx) {
    	let svelte_element;
    	let svelte_element_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[28].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[32], null);

    	let svelte_element_levels = [
    		{
    			class: svelte_element_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    				css: {
    					.../*getCSSStyles*/ ctx[8](/*theme*/ ctx[11]),
    					.../*systemStyles*/ ctx[6]
    				}
    			}))
    		},
    		/*$$restProps*/ ctx[12]
    	];

    	let svelte_element_data = {};

    	for (let i = 0; i < svelte_element_levels.length; i += 1) {
    		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svelte_element = element(/*castRoot*/ ctx[10]());
    			if (default_slot) default_slot.c();
    			set_dynamic_element_data(/*castRoot*/ ctx[10]())(svelte_element, svelte_element_data);
    			add_location(svelte_element, file$l, 53, 1, 1722);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svelte_element, anchor);

    			if (default_slot) {
    				default_slot.m(svelte_element, null);
    			}

    			/*svelte_element_binding*/ ctx[29](svelte_element);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(/*forwardEvents*/ ctx[9].call(null, svelte_element)),
    					action_destroyer(useActions_action = useActions.call(null, svelte_element, /*use*/ ctx[1]))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[32],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[32])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[32], dirty, null),
    						null
    					);
    				}
    			}

    			set_dynamic_element_data(/*castRoot*/ ctx[10]())(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
    				(!current || dirty[0] & /*className, BoxStyles, getCSSStyles, systemStyles*/ 452 && svelte_element_class_value !== (svelte_element_class_value = "" + (/*className*/ ctx[2] + " " + /*BoxStyles*/ ctx[7]({
    					css: {
    						.../*getCSSStyles*/ ctx[8](/*theme*/ ctx[11]),
    						.../*systemStyles*/ ctx[6]
    					}
    				})))) && { class: svelte_element_class_value },
    				dirty[0] & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_element);
    			if (default_slot) default_slot.d(detaching);
    			/*svelte_element_binding*/ ctx[29](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_dynamic_element$1.name,
    		type: "child_dynamic_element",
    		source: "(54:1) <svelte:element   bind:this={element}   this={castRoot()}   use:forwardEvents   use:useActions={use}   class=\\\"{className} {BoxStyles({ css: {...getCSSStyles(theme), ...systemStyles} })}\\\"   {...$$restProps}  >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$B(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$i, create_if_block_1$a, create_else_block$a];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*isHTMLElement*/ ctx[4]) return 0;
    		if (/*isComponent*/ ctx[5] && typeof /*root*/ ctx[3] !== 'string') return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	let getCSSStyles;
    	let BoxStyles;
    	let systemStyles;

    	const omit_props_names = [
    		"use","element","class","css","root","m","my","mx","mt","mb","ml","mr","p","py","px","pt","pb","pl","pr"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Box', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', css: css$1 = {}, root = undefined, m = undefined, my = undefined, mx = undefined, mt = undefined, mb = undefined, ml = undefined, mr = undefined, p = undefined, py = undefined, px = undefined, pt = undefined, pb = undefined, pl = undefined, pr = undefined } = $$props;

    	/** An action that forwards inner dom node events from parent component */
    	const forwardEvents = createEventForwarder(get_current_component());

    	/** workaround for root type errors, this should be replaced by a better type system */
    	const castRoot = () => root;

    	const theme = useSvelteUIThemeContext()?.theme || useSvelteUITheme();
    	let isHTMLElement;
    	let isComponent;

    	function svelte_element_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('css' in $$new_props) $$invalidate(13, css$1 = $$new_props.css);
    		if ('root' in $$new_props) $$invalidate(3, root = $$new_props.root);
    		if ('m' in $$new_props) $$invalidate(14, m = $$new_props.m);
    		if ('my' in $$new_props) $$invalidate(15, my = $$new_props.my);
    		if ('mx' in $$new_props) $$invalidate(16, mx = $$new_props.mx);
    		if ('mt' in $$new_props) $$invalidate(17, mt = $$new_props.mt);
    		if ('mb' in $$new_props) $$invalidate(18, mb = $$new_props.mb);
    		if ('ml' in $$new_props) $$invalidate(19, ml = $$new_props.ml);
    		if ('mr' in $$new_props) $$invalidate(20, mr = $$new_props.mr);
    		if ('p' in $$new_props) $$invalidate(21, p = $$new_props.p);
    		if ('py' in $$new_props) $$invalidate(22, py = $$new_props.py);
    		if ('px' in $$new_props) $$invalidate(23, px = $$new_props.px);
    		if ('pt' in $$new_props) $$invalidate(24, pt = $$new_props.pt);
    		if ('pb' in $$new_props) $$invalidate(25, pb = $$new_props.pb);
    		if ('pl' in $$new_props) $$invalidate(26, pl = $$new_props.pl);
    		if ('pr' in $$new_props) $$invalidate(27, pr = $$new_props.pr);
    		if ('$$scope' in $$new_props) $$invalidate(32, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getSystemStyles,
    		_css: css,
    		useSvelteUITheme,
    		useSvelteUIThemeContext,
    		createEventForwarder,
    		useActions,
    		get_current_component,
    		use,
    		element,
    		className,
    		css: css$1,
    		root,
    		m,
    		my,
    		mx,
    		mt,
    		mb,
    		ml,
    		mr,
    		p,
    		py,
    		px,
    		pt,
    		pb,
    		pl,
    		pr,
    		forwardEvents,
    		castRoot,
    		theme,
    		isHTMLElement,
    		isComponent,
    		systemStyles,
    		BoxStyles,
    		getCSSStyles
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('css' in $$props) $$invalidate(13, css$1 = $$new_props.css);
    		if ('root' in $$props) $$invalidate(3, root = $$new_props.root);
    		if ('m' in $$props) $$invalidate(14, m = $$new_props.m);
    		if ('my' in $$props) $$invalidate(15, my = $$new_props.my);
    		if ('mx' in $$props) $$invalidate(16, mx = $$new_props.mx);
    		if ('mt' in $$props) $$invalidate(17, mt = $$new_props.mt);
    		if ('mb' in $$props) $$invalidate(18, mb = $$new_props.mb);
    		if ('ml' in $$props) $$invalidate(19, ml = $$new_props.ml);
    		if ('mr' in $$props) $$invalidate(20, mr = $$new_props.mr);
    		if ('p' in $$props) $$invalidate(21, p = $$new_props.p);
    		if ('py' in $$props) $$invalidate(22, py = $$new_props.py);
    		if ('px' in $$props) $$invalidate(23, px = $$new_props.px);
    		if ('pt' in $$props) $$invalidate(24, pt = $$new_props.pt);
    		if ('pb' in $$props) $$invalidate(25, pb = $$new_props.pb);
    		if ('pl' in $$props) $$invalidate(26, pl = $$new_props.pl);
    		if ('pr' in $$props) $$invalidate(27, pr = $$new_props.pr);
    		if ('isHTMLElement' in $$props) $$invalidate(4, isHTMLElement = $$new_props.isHTMLElement);
    		if ('isComponent' in $$props) $$invalidate(5, isComponent = $$new_props.isComponent);
    		if ('systemStyles' in $$props) $$invalidate(6, systemStyles = $$new_props.systemStyles);
    		if ('BoxStyles' in $$props) $$invalidate(7, BoxStyles = $$new_props.BoxStyles);
    		if ('getCSSStyles' in $$props) $$invalidate(8, getCSSStyles = $$new_props.getCSSStyles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*css*/ 8192) {
    			$$invalidate(8, getCSSStyles = typeof css$1 === 'function' ? css$1 : () => css$1);
    		}

    		if ($$self.$$.dirty[0] & /*root*/ 8) {
    			{
    				$$invalidate(4, isHTMLElement = root && typeof root === 'string');
    				$$invalidate(5, isComponent = root && typeof root === 'function');
    			}
    		}

    		if ($$self.$$.dirty[0] & /*m, my, mx, mt, mb, ml, mr, p, py, px, pt, pb, pl, pr*/ 268419072) {
    			$$invalidate(6, systemStyles = getSystemStyles(
    				{
    					m,
    					my,
    					mx,
    					mt,
    					mb,
    					ml,
    					mr,
    					p,
    					py,
    					px,
    					pt,
    					pb,
    					pl,
    					pr
    				},
    				theme
    			));
    		}
    	};

    	$$invalidate(7, BoxStyles = css({}));

    	return [
    		element,
    		use,
    		className,
    		root,
    		isHTMLElement,
    		isComponent,
    		systemStyles,
    		BoxStyles,
    		getCSSStyles,
    		forwardEvents,
    		castRoot,
    		theme,
    		$$restProps,
    		css$1,
    		m,
    		my,
    		mx,
    		mt,
    		mb,
    		ml,
    		mr,
    		p,
    		py,
    		px,
    		pt,
    		pb,
    		pl,
    		pr,
    		slots,
    		svelte_element_binding,
    		switch_instance_binding,
    		div_binding,
    		$$scope
    	];
    }

    class Box extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$B,
    			create_fragment$B,
    			safe_not_equal,
    			{
    				use: 1,
    				element: 0,
    				class: 2,
    				css: 13,
    				root: 3,
    				m: 14,
    				my: 15,
    				mx: 16,
    				mt: 17,
    				mb: 18,
    				ml: 19,
    				mr: 20,
    				p: 21,
    				py: 22,
    				px: 23,
    				pt: 24,
    				pb: 25,
    				pl: 26,
    				pr: 27
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Box",
    			options,
    			id: create_fragment$B.name
    		});
    	}

    	get use() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get css() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set css(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get root() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set root(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get m() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set m(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get my() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set my(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mx() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mx(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mt() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mt(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mb() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mb(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ml() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ml(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mr() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mr(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get p() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set p(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get py() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set py(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get px() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set px(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pt() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pt(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pb() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pb(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pl() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pl(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pr() {
    		throw new Error("<Box>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pr(value) {
    		throw new Error("<Box>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Box$1 = Box;

    const sizes$7 = {
        xs: {
            height: 30,
            padding: '0px 14px'
        },
        sm: {
            height: 36,
            padding: '0px 18px'
        },
        md: {
            height: 42,
            padding: '0px 22px'
        },
        lg: {
            height: 50,
            padding: '0px 26px'
        },
        xl: {
            height: 60,
            padding: '0px 32px'
        },
        'compact-xs': {
            height: 22,
            padding: '0 7px'
        },
        'compact-sm': {
            height: 26,
            padding: '0 8px'
        },
        'compact-md': {
            height: 30,
            padding: '0 10px'
        },
        'compact-lg': {
            height: 34,
            padding: '0 12px'
        },
        'compact-xl': {
            height: 40,
            padding: '0 14px'
        }
    };
    var useStyles$h = createStyles((theme, { color, compact, fullSize, gradient, radius, size, variant }) => {
        return {
            root: {
                focusRing: 'auto',
                cursor: 'pointer',
                position: 'relative',
                boxSizing: 'border-box',
                textDecoration: 'none',
                outline: 'none',
                userSelect: 'none',
                appearance: 'none',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: null,
                borderRadius: typeof radius === 'number' ? radius : `$${radius}`,
                height: typeof size === 'number' ? `${size}px` : sizes$7[compact ? `compact-${size}` : size].height,
                padding: typeof size === 'number'
                    ? `0px ${size}px`
                    : sizes$7[compact ? `compact-${size}` : size].padding,
                fontFamily: theme.fonts.standard.value ?? 'sans-serif',
                fontWeight: '$semibold',
                fontSize: `$${size}`,
                lineHeight: 1,
                flexGrow: 0,
                width: fullSize ? '100%' : 'fit-content',
                '&:hover': {
                    backgroundColor: variant === 'gradient' ? null : theme.fn.themeColor(color, 7),
                    backgroundSize: variant === 'gradient' ? '200%' : null
                },
                '&:active': {
                    transform: 'translateY(1px)'
                },
                '&:disabled': {
                    pointerEvents: 'none',
                    borderColor: 'transparent',
                    background: theme.fn.themeColor('gray', 2),
                    backgroundColor: theme.fn.themeColor('gray', 2),
                    color: theme.fn.themeColor('gray', 5),
                    cursor: 'not-allowed',
                    darkMode: {
                        borderColor: 'transparent',
                        backgroundColor: theme.fn.themeColor('dark', 4),
                        color: theme.fn.themeColor('dark', 6)
                    }
                }
            },
            disabled: {
                pointerEvents: 'none',
                borderColor: 'transparent',
                background: theme.fn.themeColor('gray', 2),
                backgroundColor: theme.fn.themeColor('gray', 2),
                color: theme.fn.themeColor('gray', 5),
                cursor: 'not-allowed',
                darkMode: {
                    backgroundColor: theme.fn.themeColor('dark', 4),
                    color: theme.fn.themeColor('dark', 6)
                }
            },
            loading: {
                pointerEvents: 'none',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -1,
                    backgroundColor: 'rgba(255, 255, 255, .5)',
                    borderRadius: `$${radius}`,
                    cursor: 'not-allowed'
                },
                darkMode: {
                    '&::before': {
                        backgroundColor: theme.fn.rgba(theme.fn.themeColor('dark', 7), 0.5)
                    }
                }
            },
            variants: {
                variation: vFunc(color, gradient),
                // Used to override the disable style when using anchor HTML element
                disabled: {
                    true: {
                        pointerEvents: 'none',
                        borderColor: 'transparent',
                        background: theme.fn.themeColor('gray', 2),
                        backgroundColor: theme.fn.themeColor('gray', 2),
                        color: theme.fn.themeColor('gray', 5),
                        cursor: 'not-allowed',
                        [`${dark.selector} &`]: {
                            borderColor: 'transparent',
                            backgroundColor: theme.fn.themeColor('dark', 4),
                            color: theme.fn.themeColor('dark', 6)
                        }
                    }
                }
            }
        };
    });

    /** Error codes for component
     *
     * `Object.freeze` is needed to keep modification outside of the object unavailable
     *
     * ## Code 1:
     * If using the disabled prop, a loading cannot be set at the same time
     *
     * ## Code 2:
     * If using the external prop, a href prop must be associated with it
     */
    const ButtonErrors = Object.freeze([
        {
            error: true,
            message: 'If using the disabled prop, a loading cannot be set at the same time',
            solution: `
                If your component looks like this:
                
                &lt;Button disabled loading ...&gt; Button Text &lt;/Button&gt;
                         ^^^^^^^^ ^^^^^^^ - Try removing one of these
                `
        },
        {
            error: true,
            message: 'If using the external prop, a href prop must be associated with it. If you have an href prop there must be content inside.',
            solution: `
                If your component looks like this:
                
                &lt;Button external ...&gt; Button Text &lt;/Button&gt;
                         ^^^^^^^^ - Try adding the href prop too
                `
        }
    ]);

    /* ../node_modules/@svelteuidev/core/dist/components/Loader/loaders/Circle.svelte generated by Svelte v3.59.2 */
    const file$k = "../node_modules/@svelteuidev/core/dist/components/Loader/loaders/Circle.svelte";

    function create_fragment$A(ctx) {
    	let svg;
    	let g1;
    	let g0;
    	let circle;
    	let path;
    	let animateTransform;
    	let svg_width_value;
    	let svg_height_value;
    	let useActions_action;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g1 = svg_element("g");
    			g0 = svg_element("g");
    			circle = svg_element("circle");
    			path = svg_element("path");
    			animateTransform = svg_element("animateTransform");
    			attr_dev(circle, "stroke-opacity", ".5");
    			attr_dev(circle, "cx", "16");
    			attr_dev(circle, "cy", "16");
    			attr_dev(circle, "r", "16");
    			add_location(circle, file$k, 19, 3, 453);
    			attr_dev(animateTransform, "attributeName", "transform");
    			attr_dev(animateTransform, "type", "rotate");
    			attr_dev(animateTransform, "from", "0 16 16");
    			attr_dev(animateTransform, "to", "360 16 16");
    			attr_dev(animateTransform, "dur", "1s");
    			attr_dev(animateTransform, "repeatCount", "indefinite");
    			add_location(animateTransform, file$k, 21, 4, 553);
    			attr_dev(path, "d", "M32 16c0-9.94-8.06-16-16-16");
    			add_location(path, file$k, 20, 3, 510);
    			attr_dev(g0, "transform", "translate(2.5 2.5)");
    			attr_dev(g0, "stroke-width", "5");
    			add_location(g0, file$k, 18, 2, 398);
    			attr_dev(g1, "fill", "none");
    			attr_dev(g1, "fill-rule", "evenodd");
    			add_location(g1, file$k, 17, 1, 360);
    			attr_dev(svg, "width", svg_width_value = `${/*size*/ ctx[1]}px`);
    			attr_dev(svg, "height", svg_height_value = `${/*size*/ ctx[1]}px`);
    			attr_dev(svg, "viewBox", "0 0 38 38");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "stroke", /*color*/ ctx[2]);
    			attr_dev(svg, "class", /*className*/ ctx[3]);
    			add_location(svg, file$k, 8, 0, 195);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g1);
    			append_dev(g1, g0);
    			append_dev(g0, circle);
    			append_dev(g0, path);
    			append_dev(path, animateTransform);

    			if (!mounted) {
    				dispose = action_destroyer(useActions_action = useActions.call(null, svg, /*use*/ ctx[0]));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*size*/ 2 && svg_width_value !== (svg_width_value = `${/*size*/ ctx[1]}px`)) {
    				attr_dev(svg, "width", svg_width_value);
    			}

    			if (dirty & /*size*/ 2 && svg_height_value !== (svg_height_value = `${/*size*/ ctx[1]}px`)) {
    				attr_dev(svg, "height", svg_height_value);
    			}

    			if (dirty & /*color*/ 4) {
    				attr_dev(svg, "stroke", /*color*/ ctx[2]);
    			}

    			if (dirty & /*className*/ 8) {
    				attr_dev(svg, "class", /*className*/ ctx[3]);
    			}

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Circle', slots, []);
    	let { use = [] } = $$props;
    	let { size = 25 } = $$props;
    	let { color = 'blue' } = $$props;
    	let { class: className = '' } = $$props;
    	const writable_props = ['use', 'size', 'color', 'class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Circle> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('use' in $$props) $$invalidate(0, use = $$props.use);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('class' in $$props) $$invalidate(3, className = $$props.class);
    	};

    	$$self.$capture_state = () => ({ useActions, use, size, color, className });

    	$$self.$inject_state = $$props => {
    		if ('use' in $$props) $$invalidate(0, use = $$props.use);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('className' in $$props) $$invalidate(3, className = $$props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [use, size, color, className];
    }

    class Circle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, { use: 0, size: 1, color: 2, class: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Circle",
    			options,
    			id: create_fragment$A.name
    		});
    	}

    	get use() {
    		throw new Error("<Circle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Circle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Circle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Circle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Circle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Circle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Circle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Circle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Circle$1 = Circle;

    /* ../node_modules/@svelteuidev/core/dist/components/Loader/loaders/Bars.svelte generated by Svelte v3.59.2 */
    const file$j = "../node_modules/@svelteuidev/core/dist/components/Loader/loaders/Bars.svelte";

    function create_fragment$z(ctx) {
    	let svg;
    	let rect0;
    	let animate0;
    	let animate1;
    	let rect1;
    	let animate2;
    	let animate3;
    	let rect2;
    	let animate4;
    	let animate5;
    	let rect3;
    	let animate6;
    	let animate7;
    	let rect4;
    	let animate8;
    	let animate9;
    	let svg_width_value;
    	let useActions_action;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			rect0 = svg_element("rect");
    			animate0 = svg_element("animate");
    			animate1 = svg_element("animate");
    			rect1 = svg_element("rect");
    			animate2 = svg_element("animate");
    			animate3 = svg_element("animate");
    			rect2 = svg_element("rect");
    			animate4 = svg_element("animate");
    			animate5 = svg_element("animate");
    			rect3 = svg_element("rect");
    			animate6 = svg_element("animate");
    			animate7 = svg_element("animate");
    			rect4 = svg_element("rect");
    			animate8 = svg_element("animate");
    			animate9 = svg_element("animate");
    			attr_dev(animate0, "attributeName", "height");
    			attr_dev(animate0, "begin", "0.5s");
    			attr_dev(animate0, "dur", "1s");
    			attr_dev(animate0, "values", "120;110;100;90;80;70;60;50;40;140;120");
    			attr_dev(animate0, "calcMode", "linear");
    			attr_dev(animate0, "repeatCount", "indefinite");
    			add_location(animate0, file$j, 17, 2, 385);
    			attr_dev(animate1, "attributeName", "y");
    			attr_dev(animate1, "begin", "0.5s");
    			attr_dev(animate1, "dur", "1s");
    			attr_dev(animate1, "values", "10;15;20;25;30;35;40;45;50;0;10");
    			attr_dev(animate1, "calcMode", "linear");
    			attr_dev(animate1, "repeatCount", "indefinite");
    			add_location(animate1, file$j, 25, 2, 554);
    			attr_dev(rect0, "y", "10");
    			attr_dev(rect0, "width", "15");
    			attr_dev(rect0, "height", "120");
    			attr_dev(rect0, "rx", "6");
    			add_location(rect0, file$j, 16, 1, 338);
    			attr_dev(animate2, "attributeName", "height");
    			attr_dev(animate2, "begin", "0.25s");
    			attr_dev(animate2, "dur", "1s");
    			attr_dev(animate2, "values", "120;110;100;90;80;70;60;50;40;140;120");
    			attr_dev(animate2, "calcMode", "linear");
    			attr_dev(animate2, "repeatCount", "indefinite");
    			add_location(animate2, file$j, 35, 2, 774);
    			attr_dev(animate3, "attributeName", "y");
    			attr_dev(animate3, "begin", "0.25s");
    			attr_dev(animate3, "dur", "1s");
    			attr_dev(animate3, "values", "10;15;20;25;30;35;40;45;50;0;10");
    			attr_dev(animate3, "calcMode", "linear");
    			attr_dev(animate3, "repeatCount", "indefinite");
    			add_location(animate3, file$j, 43, 2, 944);
    			attr_dev(rect1, "x", "30");
    			attr_dev(rect1, "y", "10");
    			attr_dev(rect1, "width", "15");
    			attr_dev(rect1, "height", "120");
    			attr_dev(rect1, "rx", "6");
    			add_location(rect1, file$j, 34, 1, 720);
    			attr_dev(animate4, "attributeName", "height");
    			attr_dev(animate4, "begin", "0s");
    			attr_dev(animate4, "dur", "1s");
    			attr_dev(animate4, "values", "120;110;100;90;80;70;60;50;40;140;120");
    			attr_dev(animate4, "calcMode", "linear");
    			attr_dev(animate4, "repeatCount", "indefinite");
    			add_location(animate4, file$j, 53, 2, 1158);
    			attr_dev(animate5, "attributeName", "y");
    			attr_dev(animate5, "begin", "0s");
    			attr_dev(animate5, "dur", "1s");
    			attr_dev(animate5, "values", "10;15;20;25;30;35;40;45;50;0;10");
    			attr_dev(animate5, "calcMode", "linear");
    			attr_dev(animate5, "repeatCount", "indefinite");
    			add_location(animate5, file$j, 61, 2, 1325);
    			attr_dev(rect2, "x", "60");
    			attr_dev(rect2, "width", "15");
    			attr_dev(rect2, "height", "140");
    			attr_dev(rect2, "rx", "6");
    			add_location(rect2, file$j, 52, 1, 1111);
    			attr_dev(animate6, "attributeName", "height");
    			attr_dev(animate6, "begin", "0.25s");
    			attr_dev(animate6, "dur", "1s");
    			attr_dev(animate6, "values", "120;110;100;90;80;70;60;50;40;140;120");
    			attr_dev(animate6, "calcMode", "linear");
    			attr_dev(animate6, "repeatCount", "indefinite");
    			add_location(animate6, file$j, 71, 2, 1543);
    			attr_dev(animate7, "attributeName", "y");
    			attr_dev(animate7, "begin", "0.25s");
    			attr_dev(animate7, "dur", "1s");
    			attr_dev(animate7, "values", "10;15;20;25;30;35;40;45;50;0;10");
    			attr_dev(animate7, "calcMode", "linear");
    			attr_dev(animate7, "repeatCount", "indefinite");
    			add_location(animate7, file$j, 79, 2, 1713);
    			attr_dev(rect3, "x", "90");
    			attr_dev(rect3, "y", "10");
    			attr_dev(rect3, "width", "15");
    			attr_dev(rect3, "height", "120");
    			attr_dev(rect3, "rx", "6");
    			add_location(rect3, file$j, 70, 1, 1489);
    			attr_dev(animate8, "attributeName", "height");
    			attr_dev(animate8, "begin", "0.5s");
    			attr_dev(animate8, "dur", "1s");
    			attr_dev(animate8, "values", "120;110;100;90;80;70;60;50;40;140;120");
    			attr_dev(animate8, "calcMode", "linear");
    			attr_dev(animate8, "repeatCount", "indefinite");
    			add_location(animate8, file$j, 89, 2, 1935);
    			attr_dev(animate9, "attributeName", "y");
    			attr_dev(animate9, "begin", "0.5s");
    			attr_dev(animate9, "dur", "1s");
    			attr_dev(animate9, "values", "10;15;20;25;30;35;40;45;50;0;10");
    			attr_dev(animate9, "calcMode", "linear");
    			attr_dev(animate9, "repeatCount", "indefinite");
    			add_location(animate9, file$j, 97, 2, 2104);
    			attr_dev(rect4, "x", "120");
    			attr_dev(rect4, "y", "10");
    			attr_dev(rect4, "width", "15");
    			attr_dev(rect4, "height", "120");
    			attr_dev(rect4, "rx", "6");
    			add_location(rect4, file$j, 88, 1, 1880);
    			attr_dev(svg, "viewBox", "0 0 135 140");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "fill", /*color*/ ctx[2]);
    			attr_dev(svg, "width", svg_width_value = `${/*size*/ ctx[1]}px`);
    			attr_dev(svg, "class", /*className*/ ctx[3]);
    			add_location(svg, file$j, 8, 0, 195);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, rect0);
    			append_dev(rect0, animate0);
    			append_dev(rect0, animate1);
    			append_dev(svg, rect1);
    			append_dev(rect1, animate2);
    			append_dev(rect1, animate3);
    			append_dev(svg, rect2);
    			append_dev(rect2, animate4);
    			append_dev(rect2, animate5);
    			append_dev(svg, rect3);
    			append_dev(rect3, animate6);
    			append_dev(rect3, animate7);
    			append_dev(svg, rect4);
    			append_dev(rect4, animate8);
    			append_dev(rect4, animate9);

    			if (!mounted) {
    				dispose = action_destroyer(useActions_action = useActions.call(null, svg, /*use*/ ctx[0]));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*color*/ 4) {
    				attr_dev(svg, "fill", /*color*/ ctx[2]);
    			}

    			if (dirty & /*size*/ 2 && svg_width_value !== (svg_width_value = `${/*size*/ ctx[1]}px`)) {
    				attr_dev(svg, "width", svg_width_value);
    			}

    			if (dirty & /*className*/ 8) {
    				attr_dev(svg, "class", /*className*/ ctx[3]);
    			}

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Bars', slots, []);
    	let { use = [] } = $$props;
    	let { size = 25 } = $$props;
    	let { color = 'blue' } = $$props;
    	let { class: className = '' } = $$props;
    	const writable_props = ['use', 'size', 'color', 'class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Bars> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('use' in $$props) $$invalidate(0, use = $$props.use);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('class' in $$props) $$invalidate(3, className = $$props.class);
    	};

    	$$self.$capture_state = () => ({ useActions, use, size, color, className });

    	$$self.$inject_state = $$props => {
    		if ('use' in $$props) $$invalidate(0, use = $$props.use);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('className' in $$props) $$invalidate(3, className = $$props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [use, size, color, className];
    }

    class Bars extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, { use: 0, size: 1, color: 2, class: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bars",
    			options,
    			id: create_fragment$z.name
    		});
    	}

    	get use() {
    		throw new Error("<Bars>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Bars>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Bars>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Bars>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Bars>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Bars>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Bars>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Bars>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Bars$1 = Bars;

    /* ../node_modules/@svelteuidev/core/dist/components/Loader/loaders/Dots.svelte generated by Svelte v3.59.2 */
    const file$i = "../node_modules/@svelteuidev/core/dist/components/Loader/loaders/Dots.svelte";

    function create_fragment$y(ctx) {
    	let svg;
    	let circle0;
    	let animate0;
    	let animate1;
    	let circle1;
    	let animate2;
    	let animate3;
    	let circle2;
    	let animate4;
    	let animate5;
    	let svg_width_value;
    	let svg_height_value;
    	let useActions_action;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			circle0 = svg_element("circle");
    			animate0 = svg_element("animate");
    			animate1 = svg_element("animate");
    			circle1 = svg_element("circle");
    			animate2 = svg_element("animate");
    			animate3 = svg_element("animate");
    			circle2 = svg_element("circle");
    			animate4 = svg_element("animate");
    			animate5 = svg_element("animate");
    			attr_dev(animate0, "attributeName", "r");
    			attr_dev(animate0, "from", "15");
    			attr_dev(animate0, "to", "15");
    			attr_dev(animate0, "begin", "0s");
    			attr_dev(animate0, "dur", "0.8s");
    			attr_dev(animate0, "values", "15;9;15");
    			attr_dev(animate0, "calcMode", "linear");
    			attr_dev(animate0, "repeatCount", "indefinite");
    			add_location(animate0, file$i, 18, 2, 405);
    			attr_dev(animate1, "attributeName", "fill-opacity");
    			attr_dev(animate1, "from", "1");
    			attr_dev(animate1, "to", "1");
    			attr_dev(animate1, "begin", "0s");
    			attr_dev(animate1, "dur", "0.8s");
    			attr_dev(animate1, "values", "1;.5;1");
    			attr_dev(animate1, "calcMode", "linear");
    			attr_dev(animate1, "repeatCount", "indefinite");
    			add_location(animate1, file$i, 28, 2, 563);
    			attr_dev(circle0, "cx", "15");
    			attr_dev(circle0, "cy", "15");
    			attr_dev(circle0, "r", "15");
    			add_location(circle0, file$i, 17, 1, 371);
    			attr_dev(animate2, "attributeName", "r");
    			attr_dev(animate2, "from", "9");
    			attr_dev(animate2, "to", "9");
    			attr_dev(animate2, "begin", "0s");
    			attr_dev(animate2, "dur", "0.8s");
    			attr_dev(animate2, "values", "9;15;9");
    			attr_dev(animate2, "calcMode", "linear");
    			attr_dev(animate2, "repeatCount", "indefinite");
    			add_location(animate2, file$i, 40, 2, 791);
    			attr_dev(animate3, "attributeName", "fill-opacity");
    			attr_dev(animate3, "from", "0.5");
    			attr_dev(animate3, "to", "0.5");
    			attr_dev(animate3, "begin", "0s");
    			attr_dev(animate3, "dur", "0.8s");
    			attr_dev(animate3, "values", ".5;1;.5");
    			attr_dev(animate3, "calcMode", "linear");
    			attr_dev(animate3, "repeatCount", "indefinite");
    			add_location(animate3, file$i, 50, 2, 946);
    			attr_dev(circle1, "cx", "60");
    			attr_dev(circle1, "cy", "15");
    			attr_dev(circle1, "r", "9");
    			attr_dev(circle1, "fill-opacity", "0.3");
    			add_location(circle1, file$i, 39, 1, 739);
    			attr_dev(animate4, "attributeName", "r");
    			attr_dev(animate4, "from", "15");
    			attr_dev(animate4, "to", "15");
    			attr_dev(animate4, "begin", "0s");
    			attr_dev(animate4, "dur", "0.8s");
    			attr_dev(animate4, "values", "15;9;15");
    			attr_dev(animate4, "calcMode", "linear");
    			attr_dev(animate4, "repeatCount", "indefinite");
    			add_location(animate4, file$i, 62, 2, 1162);
    			attr_dev(animate5, "attributeName", "fill-opacity");
    			attr_dev(animate5, "from", "1");
    			attr_dev(animate5, "to", "1");
    			attr_dev(animate5, "begin", "0s");
    			attr_dev(animate5, "dur", "0.8s");
    			attr_dev(animate5, "values", "1;.5;1");
    			attr_dev(animate5, "calcMode", "linear");
    			attr_dev(animate5, "repeatCount", "indefinite");
    			add_location(animate5, file$i, 72, 2, 1320);
    			attr_dev(circle2, "cx", "105");
    			attr_dev(circle2, "cy", "15");
    			attr_dev(circle2, "r", "15");
    			add_location(circle2, file$i, 61, 1, 1127);
    			attr_dev(svg, "width", svg_width_value = `${/*size*/ ctx[1]}px`);
    			attr_dev(svg, "height", svg_height_value = `${Number(/*size*/ ctx[1]) / 4}px`);
    			attr_dev(svg, "viewBox", "0 0 120 30");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "fill", /*color*/ ctx[2]);
    			attr_dev(svg, "class", /*className*/ ctx[3]);
    			add_location(svg, file$i, 8, 0, 195);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, circle0);
    			append_dev(circle0, animate0);
    			append_dev(circle0, animate1);
    			append_dev(svg, circle1);
    			append_dev(circle1, animate2);
    			append_dev(circle1, animate3);
    			append_dev(svg, circle2);
    			append_dev(circle2, animate4);
    			append_dev(circle2, animate5);

    			if (!mounted) {
    				dispose = action_destroyer(useActions_action = useActions.call(null, svg, /*use*/ ctx[0]));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*size*/ 2 && svg_width_value !== (svg_width_value = `${/*size*/ ctx[1]}px`)) {
    				attr_dev(svg, "width", svg_width_value);
    			}

    			if (dirty & /*size*/ 2 && svg_height_value !== (svg_height_value = `${Number(/*size*/ ctx[1]) / 4}px`)) {
    				attr_dev(svg, "height", svg_height_value);
    			}

    			if (dirty & /*color*/ 4) {
    				attr_dev(svg, "fill", /*color*/ ctx[2]);
    			}

    			if (dirty & /*className*/ 8) {
    				attr_dev(svg, "class", /*className*/ ctx[3]);
    			}

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Dots', slots, []);
    	let { use = [] } = $$props;
    	let { size = 25 } = $$props;
    	let { color = 'blue' } = $$props;
    	let { class: className = '' } = $$props;
    	const writable_props = ['use', 'size', 'color', 'class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dots> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('use' in $$props) $$invalidate(0, use = $$props.use);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('class' in $$props) $$invalidate(3, className = $$props.class);
    	};

    	$$self.$capture_state = () => ({ useActions, use, size, color, className });

    	$$self.$inject_state = $$props => {
    		if ('use' in $$props) $$invalidate(0, use = $$props.use);
    		if ('size' in $$props) $$invalidate(1, size = $$props.size);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('className' in $$props) $$invalidate(3, className = $$props.className);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [use, size, color, className];
    }

    class Dots extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$y, create_fragment$y, safe_not_equal, { use: 0, size: 1, color: 2, class: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dots",
    			options,
    			id: create_fragment$y.name
    		});
    	}

    	get use() {
    		throw new Error("<Dots>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Dots>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Dots>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Dots>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Dots>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Dots>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Dots>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Dots>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Dots$1 = Dots;

    const LOADER_SIZES = {
        xs: 18,
        sm: 22,
        md: 36,
        lg: 44,
        xl: 58
    };
    const getCorrectShade = (color, dark = false) => {
        return theme.colors[dark ? `${color}400` : `${color}600`].value;
    };

    /* ../node_modules/@svelteuidev/core/dist/components/Loader/Loader.svelte generated by Svelte v3.59.2 */

    function create_fragment$x(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			use: [/*forwardEvents*/ ctx[5], [useActions, /*use*/ ctx[1]]]
    		},
    		{
    			color: /*color*/ ctx[4] === 'white'
    			? 'white'
    			: getCorrectShade(/*color*/ ctx[4])
    		},
    		{
    			size: LOADER_SIZES[/*size*/ ctx[3]] || /*size*/ ctx[3]
    		},
    		{ class: /*className*/ ctx[2] },
    		/*$$restProps*/ ctx[8]
    	];

    	var switch_value = /*LOADERS*/ ctx[6][/*defaultLoader*/ ctx[7]];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    		/*switch_instance_binding*/ ctx[10](switch_instance);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const switch_instance_changes = (dirty & /*forwardEvents, useActions, use, color, getCorrectShade, LOADER_SIZES, size, className, $$restProps*/ 318)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*forwardEvents, useActions, use*/ 34 && {
    						use: [/*forwardEvents*/ ctx[5], [useActions, /*use*/ ctx[1]]]
    					},
    					dirty & /*color, getCorrectShade*/ 16 && {
    						color: /*color*/ ctx[4] === 'white'
    						? 'white'
    						: getCorrectShade(/*color*/ ctx[4])
    					},
    					dirty & /*LOADER_SIZES, size*/ 8 && {
    						size: LOADER_SIZES[/*size*/ ctx[3]] || /*size*/ ctx[3]
    					},
    					dirty & /*className*/ 4 && { class: /*className*/ ctx[2] },
    					dirty & /*$$restProps*/ 256 && get_spread_object(/*$$restProps*/ ctx[8])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*LOADERS*/ ctx[6][/*defaultLoader*/ ctx[7]])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					/*switch_instance_binding*/ ctx[10](switch_instance);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*switch_instance_binding*/ ctx[10](null);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","element","class","size","color","variant"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Loader', slots, []);
    	let { use = [], element = undefined, class: className = '', size = 'md', color = 'blue', variant = 'circle' } = $$props;

    	/** An action that forwards inner dom node events from parent component */
    	const forwardEvents = createEventForwarder(get_current_component());

    	/** Loader logic */
    	const LOADERS = { bars: Bars$1, circle: Circle$1, dots: Dots$1 };

    	const defaultLoader = variant in LOADERS ? variant : 'circle';

    	function switch_instance_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('size' in $$new_props) $$invalidate(3, size = $$new_props.size);
    		if ('color' in $$new_props) $$invalidate(4, color = $$new_props.color);
    		if ('variant' in $$new_props) $$invalidate(9, variant = $$new_props.variant);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		createEventForwarder,
    		useActions,
    		Circle: Circle$1,
    		Bars: Bars$1,
    		Dots: Dots$1,
    		LOADER_SIZES,
    		getCorrectShade,
    		use,
    		element,
    		className,
    		size,
    		color,
    		variant,
    		forwardEvents,
    		LOADERS,
    		defaultLoader
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('size' in $$props) $$invalidate(3, size = $$new_props.size);
    		if ('color' in $$props) $$invalidate(4, color = $$new_props.color);
    		if ('variant' in $$props) $$invalidate(9, variant = $$new_props.variant);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		element,
    		use,
    		className,
    		size,
    		color,
    		forwardEvents,
    		LOADERS,
    		defaultLoader,
    		$$restProps,
    		variant,
    		switch_instance_binding
    	];
    }

    class Loader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			size: 3,
    			color: 4,
    			variant: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Loader",
    			options,
    			id: create_fragment$x.name
    		});
    	}

    	get use() {
    		throw new Error("<Loader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Loader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Loader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Loader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Loader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Loader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Loader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Loader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Loader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Loader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error("<Loader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<Loader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Loader$1 = Loader;

    /* ../node_modules/@svelteuidev/core/dist/components/Button/Ripple.svelte generated by Svelte v3.59.2 */

    const { console: console_1$2 } = globals;
    const file$h = "../node_modules/@svelteuidev/core/dist/components/Button/Ripple.svelte";

    function create_fragment$w(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "ripple svelte-3pkhve");
    			add_location(div, file$h, 150, 0, 4661);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			/*div_binding*/ ctx[4](div);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*div_binding*/ ctx[4](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function isTouchEvent(e) {
    	return e.constructor.name === 'TouchEvent';
    }

    function transform(el, value) {
    	el.style['transform'] = value;
    	el.style['webkitTransform'] = value;
    }

    function opacity(el, value) {
    	el.style['opacity'] = value.toString();
    }

    const calculate = (e, el) => {
    	const offset = el.getBoundingClientRect();
    	const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    	const localX = target.clientX - offset.left;
    	const localY = target.clientY - offset.top;
    	let radius = 0;
    	let scale = 0.3;

    	// Get ripple position
    	const center = el.dataset.center;

    	const circle = el.dataset.circle;

    	if (circle) {
    		scale = 0.15;
    		radius = el.clientWidth / 2;

    		radius = center
    		? radius
    		: radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
    	} else {
    		radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
    	}

    	const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
    	const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
    	const x = center ? centerX : `${localX - radius}px`;
    	const y = center ? centerY : `${localY - radius}px`;
    	return { radius, scale, x, y, centerX, centerY };
    };

    const startRipple = function (eventType, event) {
    	const hideEvents = ['touchcancel', 'mouseleave', 'dragstart'];
    	let container = event.currentTarget || event.target;

    	if (container && !container.classList.contains('ripple')) {
    		container = container.querySelector('.ripple');
    	}

    	if (!container) {
    		return;
    	}

    	const prev = container.dataset.event;

    	if (prev && prev !== eventType) {
    		return;
    	}

    	container.dataset.event = eventType;

    	// Create the ripple
    	const wave = document.createElement('span');

    	const { radius, scale, x, y, centerX, centerY } = calculate(event, container);
    	const color = container.dataset.color;
    	const size = `${radius * 2}px`;
    	wave.className = 'animation';
    	wave.style.width = size;
    	wave.style.height = size;
    	wave.style.background = color;
    	wave.classList.add('animation-enter');
    	wave.classList.add('animation--visible');
    	transform(wave, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
    	opacity(wave, 0);
    	wave.dataset.activated = String(performance.now());
    	container.appendChild(wave);

    	setTimeout(
    		() => {
    			wave.classList.remove('animation-enter');
    			wave.classList.add('animation-in');
    			transform(wave, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
    			opacity(wave, 0.25);
    		},
    		0
    	);

    	const releaseEvent = eventType === 'mousedown' ? 'mouseup' : 'touchend';

    	const onRelease = function () {
    		document.removeEventListener(releaseEvent, onRelease);

    		hideEvents.forEach(name => {
    			document.removeEventListener(name, onRelease);
    		});

    		const diff = performance.now() - Number(wave.dataset.activated);
    		const delay = Math.max(250 - diff, 0);

    		setTimeout(
    			() => {
    				wave.classList.remove('animation-in');
    				wave.classList.add('animation-out');
    				opacity(wave, 0);

    				setTimeout(
    					() => {
    						wave && container.removeChild(wave);

    						if (container.children.length === 0) {
    							delete container.dataset.event;
    						}
    					},
    					300
    				);
    			},
    			delay
    		);
    	};

    	document.addEventListener(releaseEvent, onRelease);

    	hideEvents.forEach(name => {
    		document.addEventListener(name, onRelease, { passive: true });
    	});
    };

    const onMouseDown = function (e) {
    	// Trigger on left click only
    	if (e.button === 0) {
    		startRipple(e.type, e);
    	}
    };

    const onTouchStart = function (e) {
    	if (e.changedTouches) {
    		for (let i = 0; i < e.changedTouches.length; ++i) {
    			startRipple(e.type, e.changedTouches[i]);
    		}
    	}
    };

    function instance$w($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Ripple', slots, []);
    	let { center = false } = $$props;
    	let { circle = false } = $$props;
    	let { color = 'currentColor' } = $$props;
    	let el;
    	let trigEl;

    	onMount(async () => {
    		await tick();

    		try {
    			if (center) {
    				$$invalidate(0, el.dataset.center = 'true', el);
    			}

    			if (circle) {
    				$$invalidate(0, el.dataset.circle = 'true', el);
    			}

    			$$invalidate(0, el.dataset.color = color, el);
    			trigEl = el.parentElement;
    		} catch(err) {
    			
    		} // eslint-disable-line

    		if (!trigEl) {
    			console.error('Ripple: Trigger element not found.');
    			return;
    		}

    		let style = window.getComputedStyle(trigEl);

    		if (style.position.length === 0 || style.position === 'static') {
    			trigEl.style.position = 'relative';
    		}

    		trigEl.addEventListener('touchstart', onTouchStart, { passive: true });
    		trigEl.addEventListener('mousedown', onMouseDown, { passive: true });
    	});

    	onDestroy(() => {
    		if (!trigEl) {
    			return;
    		}

    		trigEl.removeEventListener('mousedown', onMouseDown);
    		trigEl.removeEventListener('touchstart', onTouchStart);
    	});

    	const writable_props = ['center', 'circle', 'color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<Ripple> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			el = $$value;
    			$$invalidate(0, el);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('center' in $$props) $$invalidate(1, center = $$props.center);
    		if ('circle' in $$props) $$invalidate(2, circle = $$props.circle);
    		if ('color' in $$props) $$invalidate(3, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({
    		isTouchEvent,
    		transform,
    		opacity,
    		calculate,
    		startRipple,
    		onMouseDown,
    		onTouchStart,
    		center,
    		circle,
    		color,
    		tick,
    		onMount,
    		onDestroy,
    		el,
    		trigEl
    	});

    	$$self.$inject_state = $$props => {
    		if ('center' in $$props) $$invalidate(1, center = $$props.center);
    		if ('circle' in $$props) $$invalidate(2, circle = $$props.circle);
    		if ('color' in $$props) $$invalidate(3, color = $$props.color);
    		if ('el' in $$props) $$invalidate(0, el = $$props.el);
    		if ('trigEl' in $$props) trigEl = $$props.trigEl;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [el, center, circle, color, div_binding];
    }

    class Ripple extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, { center: 1, circle: 2, color: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ripple",
    			options,
    			id: create_fragment$w.name
    		});
    	}

    	get center() {
    		throw new Error("<Ripple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set center(value) {
    		throw new Error("<Ripple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get circle() {
    		throw new Error("<Ripple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set circle(value) {
    		throw new Error("<Ripple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Ripple>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Ripple>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Ripple$1 = Ripple;

    /* ../node_modules/@svelteuidev/core/dist/components/Button/Button.svelte generated by Svelte v3.59.2 */

    const { Error: Error_1$2 } = globals;
    const file$g = "../node_modules/@svelteuidev/core/dist/components/Button/Button.svelte";
    const get_rightIcon_slot_changes_1 = dirty => ({});
    const get_rightIcon_slot_context_1 = ctx => ({});
    const get_leftIcon_slot_changes_1 = dirty => ({});
    const get_leftIcon_slot_context_1 = ctx => ({});
    const get_rightIcon_slot_changes = dirty => ({});
    const get_rightIcon_slot_context = ctx => ({});
    const get_leftIcon_slot_changes = dirty => ({});
    const get_leftIcon_slot_context = ctx => ({});

    // (96:0) {:else}
    function create_else_block$9(ctx) {
    	let button;
    	let current_block_type_index;
    	let if_block0;
    	let t0;
    	let t1;
    	let t2;
    	let current_block_type_index_1;
    	let if_block2;
    	let button_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_9, create_if_block_10];
    	const if_blocks = [];

    	function select_block_type_3(ctx, dirty) {
    		if (/*loading*/ ctx[11] && /*loaderPosition*/ ctx[5] === 'left') return 0;
    		if (/*$$slots*/ ctx[21].leftIcon) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type_3(ctx))) {
    		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const default_slot_template = /*#slots*/ ctx[28].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[27], null);
    	const default_slot_or_fallback = default_slot || fallback_block_4(ctx);
    	let if_block1 = /*ripple*/ ctx[13] && create_if_block_8(ctx);
    	const if_block_creators_1 = [create_if_block_6$1, create_if_block_7];
    	const if_blocks_1 = [];

    	function select_block_type_4(ctx, dirty) {
    		if (/*loading*/ ctx[11] && /*loaderPosition*/ ctx[5] === 'right') return 0;
    		if (/*$$slots*/ ctx[21].rightIcon) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index_1 = select_block_type_4(ctx))) {
    		if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
    	}

    	let button_levels = [
    		{
    			class: button_class_value = /*cx*/ ctx[18](
    				/*className*/ ctx[3],
    				/*classes*/ ctx[17].root,
    				/*getStyles*/ ctx[16]({
    					css: /*override*/ ctx[1],
    					variation: /*variant*/ ctx[4]
    				}),
    				{
    					[/*classes*/ ctx[17].disabled]: /*disabled*/ ctx[9],
    					[/*classes*/ ctx[17].loading]: /*loading*/ ctx[11]
    				}
    			)
    		},
    		{ disabled: /*disabled*/ ctx[9] },
    		/*$$restProps*/ ctx[20],
    		{ tabindex: "0" }
    	];

    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			set_attributes(button, button_data);
    			toggle_class(button, "compact", /*compact*/ ctx[10]);
    			toggle_class(button, "uppercase", /*uppercase*/ ctx[12]);
    			toggle_class(button, "svelte-5xpm5q", true);
    			add_location(button, file$g, 96, 1, 3080);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(button, null);
    			}

    			append_dev(button, t0);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(button, null);
    			}

    			append_dev(button, t1);
    			if (if_block1) if_block1.m(button, null);
    			append_dev(button, t2);

    			if (~current_block_type_index_1) {
    				if_blocks_1[current_block_type_index_1].m(button, null);
    			}

    			if (button.autofocus) button.focus();
    			/*button_binding*/ ctx[30](button);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, button, /*use*/ ctx[2])),
    					action_destroyer(/*forwardEvents*/ ctx[19].call(null, button))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_3(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block0) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block0 = if_blocks[current_block_type_index];

    					if (!if_block0) {
    						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block0.c();
    					} else {
    						if_block0.p(ctx, dirty);
    					}

    					transition_in(if_block0, 1);
    					if_block0.m(button, t0);
    				} else {
    					if_block0 = null;
    				}
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[27],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[27])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[27], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*ripple*/ ctx[13]) {
    				if (if_block1) {
    					if (dirty & /*ripple*/ 8192) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_8(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(button, t2);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			let previous_block_index_1 = current_block_type_index_1;
    			current_block_type_index_1 = select_block_type_4(ctx);

    			if (current_block_type_index_1 === previous_block_index_1) {
    				if (~current_block_type_index_1) {
    					if_blocks_1[current_block_type_index_1].p(ctx, dirty);
    				}
    			} else {
    				if (if_block2) {
    					group_outros();

    					transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
    						if_blocks_1[previous_block_index_1] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index_1) {
    					if_block2 = if_blocks_1[current_block_type_index_1];

    					if (!if_block2) {
    						if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
    						if_block2.c();
    					} else {
    						if_block2.p(ctx, dirty);
    					}

    					transition_in(if_block2, 1);
    					if_block2.m(button, null);
    				} else {
    					if_block2 = null;
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [
    				(!current || dirty & /*cx, className, classes, getStyles, override, variant, disabled, loading*/ 461338 && button_class_value !== (button_class_value = /*cx*/ ctx[18](
    					/*className*/ ctx[3],
    					/*classes*/ ctx[17].root,
    					/*getStyles*/ ctx[16]({
    						css: /*override*/ ctx[1],
    						variation: /*variant*/ ctx[4]
    					}),
    					{
    						[/*classes*/ ctx[17].disabled]: /*disabled*/ ctx[9],
    						[/*classes*/ ctx[17].loading]: /*loading*/ ctx[11]
    					}
    				))) && { class: button_class_value },
    				(!current || dirty & /*disabled*/ 512) && { disabled: /*disabled*/ ctx[9] },
    				dirty & /*$$restProps*/ 1048576 && /*$$restProps*/ ctx[20],
    				{ tabindex: "0" }
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
    			toggle_class(button, "compact", /*compact*/ ctx[10]);
    			toggle_class(button, "uppercase", /*uppercase*/ ctx[12]);
    			toggle_class(button, "svelte-5xpm5q", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(default_slot_or_fallback, local);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(default_slot_or_fallback, local);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			if (if_block1) if_block1.d();

    			if (~current_block_type_index_1) {
    				if_blocks_1[current_block_type_index_1].d();
    			}

    			/*button_binding*/ ctx[30](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$9.name,
    		type: "else",
    		source: "(96:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (55:0) {#if href}
    function create_if_block$h(ctx) {
    	let a;
    	let current_block_type_index;
    	let if_block0;
    	let t0;
    	let t1;
    	let t2;
    	let current_block_type_index_1;
    	let if_block2;
    	let a_class_value;
    	let a_target_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_4$3, create_if_block_5$3];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*loading*/ ctx[11] && /*loaderPosition*/ ctx[5] === 'left') return 0;
    		if (/*$$slots*/ ctx[21].leftIcon) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type_1(ctx))) {
    		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const default_slot_template = /*#slots*/ ctx[28].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[27], null);
    	const default_slot_or_fallback = default_slot || fallback_block_1(ctx);
    	let if_block1 = /*ripple*/ ctx[13] && create_if_block_3$4(ctx);
    	const if_block_creators_1 = [create_if_block_1$9, create_if_block_2$6];
    	const if_blocks_1 = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*loading*/ ctx[11] && /*loaderPosition*/ ctx[5] === 'right') return 0;
    		if (/*$$slots*/ ctx[21].rightIcon) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index_1 = select_block_type_2(ctx))) {
    		if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
    	}

    	let a_levels = [
    		{ href: /*href*/ ctx[7] },
    		{
    			class: a_class_value = /*cx*/ ctx[18](
    				/*className*/ ctx[3],
    				/*classes*/ ctx[17].root,
    				/*getStyles*/ ctx[16]({
    					css: /*override*/ ctx[1],
    					variation: /*variant*/ ctx[4],
    					disabled: /*disabled*/ ctx[9]
    				}),
    				{
    					[/*classes*/ ctx[17].disabled]: /*disabled*/ ctx[9],
    					[/*classes*/ ctx[17].loading]: /*loading*/ ctx[11]
    				}
    			)
    		},
    		{ role: "button" },
    		{ rel: "noreferrer noopener" },
    		{
    			target: a_target_value = /*external*/ ctx[8] ? '_blank' : ''
    		},
    		/*$$restProps*/ ctx[20],
    		{ tabindex: "0" }
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			set_attributes(a, a_data);
    			toggle_class(a, "compact", /*compact*/ ctx[10]);
    			toggle_class(a, "uppercase", /*uppercase*/ ctx[12]);
    			toggle_class(a, "svelte-5xpm5q", true);
    			add_location(a, file$g, 55, 1, 1981);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(a, null);
    			}

    			append_dev(a, t0);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(a, null);
    			}

    			append_dev(a, t1);
    			if (if_block1) if_block1.m(a, null);
    			append_dev(a, t2);

    			if (~current_block_type_index_1) {
    				if_blocks_1[current_block_type_index_1].m(a, null);
    			}

    			/*a_binding*/ ctx[29](a);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, a, /*use*/ ctx[2])),
    					action_destroyer(/*forwardEvents*/ ctx[19].call(null, a))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block0) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block0 = if_blocks[current_block_type_index];

    					if (!if_block0) {
    						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block0.c();
    					} else {
    						if_block0.p(ctx, dirty);
    					}

    					transition_in(if_block0, 1);
    					if_block0.m(a, t0);
    				} else {
    					if_block0 = null;
    				}
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[27],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[27])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[27], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*ripple*/ ctx[13]) {
    				if (if_block1) {
    					if (dirty & /*ripple*/ 8192) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_3$4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(a, t2);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			let previous_block_index_1 = current_block_type_index_1;
    			current_block_type_index_1 = select_block_type_2(ctx);

    			if (current_block_type_index_1 === previous_block_index_1) {
    				if (~current_block_type_index_1) {
    					if_blocks_1[current_block_type_index_1].p(ctx, dirty);
    				}
    			} else {
    				if (if_block2) {
    					group_outros();

    					transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
    						if_blocks_1[previous_block_index_1] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index_1) {
    					if_block2 = if_blocks_1[current_block_type_index_1];

    					if (!if_block2) {
    						if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
    						if_block2.c();
    					} else {
    						if_block2.p(ctx, dirty);
    					}

    					transition_in(if_block2, 1);
    					if_block2.m(a, null);
    				} else {
    					if_block2 = null;
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 128) && { href: /*href*/ ctx[7] },
    				(!current || dirty & /*cx, className, classes, getStyles, override, variant, disabled, loading*/ 461338 && a_class_value !== (a_class_value = /*cx*/ ctx[18](
    					/*className*/ ctx[3],
    					/*classes*/ ctx[17].root,
    					/*getStyles*/ ctx[16]({
    						css: /*override*/ ctx[1],
    						variation: /*variant*/ ctx[4],
    						disabled: /*disabled*/ ctx[9]
    					}),
    					{
    						[/*classes*/ ctx[17].disabled]: /*disabled*/ ctx[9],
    						[/*classes*/ ctx[17].loading]: /*loading*/ ctx[11]
    					}
    				))) && { class: a_class_value },
    				{ role: "button" },
    				{ rel: "noreferrer noopener" },
    				(!current || dirty & /*external*/ 256 && a_target_value !== (a_target_value = /*external*/ ctx[8] ? '_blank' : '')) && { target: a_target_value },
    				dirty & /*$$restProps*/ 1048576 && /*$$restProps*/ ctx[20],
    				{ tabindex: "0" }
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
    			toggle_class(a, "compact", /*compact*/ ctx[10]);
    			toggle_class(a, "uppercase", /*uppercase*/ ctx[12]);
    			toggle_class(a, "svelte-5xpm5q", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(default_slot_or_fallback, local);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(default_slot_or_fallback, local);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			if (if_block1) if_block1.d();

    			if (~current_block_type_index_1) {
    				if_blocks_1[current_block_type_index_1].d();
    			}

    			/*a_binding*/ ctx[29](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$h.name,
    		type: "if",
    		source: "(55:0) {#if href}",
    		ctx
    	});

    	return block;
    }

    // (115:29) 
    function create_if_block_10(ctx) {
    	let span;
    	let current;
    	const leftIcon_slot_template = /*#slots*/ ctx[28].leftIcon;
    	const leftIcon_slot = create_slot(leftIcon_slot_template, ctx, /*$$scope*/ ctx[27], get_leftIcon_slot_context_1);
    	const leftIcon_slot_or_fallback = leftIcon_slot || fallback_block_5(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (leftIcon_slot_or_fallback) leftIcon_slot_or_fallback.c();
    			attr_dev(span, "class", "left-section svelte-5xpm5q");
    			add_location(span, file$g, 115, 3, 3610);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (leftIcon_slot_or_fallback) {
    				leftIcon_slot_or_fallback.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (leftIcon_slot) {
    				if (leftIcon_slot.p && (!current || dirty & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						leftIcon_slot,
    						leftIcon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[27],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[27])
    						: get_slot_changes(leftIcon_slot_template, /*$$scope*/ ctx[27], dirty, get_leftIcon_slot_changes_1),
    						get_leftIcon_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftIcon_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftIcon_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (leftIcon_slot_or_fallback) leftIcon_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(115:29) ",
    		ctx
    	});

    	return block;
    }

    // (111:2) {#if loading && loaderPosition === 'left'}
    function create_if_block_9(ctx) {
    	let span;
    	let loader;
    	let current;

    	loader = new Loader$1({
    			props: {
    				variant: /*loaderProps*/ ctx[6].variant,
    				size: /*loaderProps*/ ctx[6].size,
    				color: /*loaderProps*/ ctx[6].color
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(loader.$$.fragment);
    			attr_dev(span, "class", "left-section svelte-5xpm5q");
    			add_location(span, file$g, 111, 3, 3443);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(loader, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const loader_changes = {};
    			if (dirty & /*loaderProps*/ 64) loader_changes.variant = /*loaderProps*/ ctx[6].variant;
    			if (dirty & /*loaderProps*/ 64) loader_changes.size = /*loaderProps*/ ctx[6].size;
    			if (dirty & /*loaderProps*/ 64) loader_changes.color = /*loaderProps*/ ctx[6].color;
    			loader.$set(loader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(loader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(111:2) {#if loading && loaderPosition === 'left'}",
    		ctx
    	});

    	return block;
    }

    // (117:26) X
    function fallback_block_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("X");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_5.name,
    		type: "fallback",
    		source: "(117:26) X",
    		ctx
    	});

    	return block;
    }

    // (120:8) Button
    function fallback_block_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Button");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_4.name,
    		type: "fallback",
    		source: "(120:8) Button",
    		ctx
    	});

    	return block;
    }

    // (121:2) {#if ripple}
    function create_if_block_8(ctx) {
    	let ripple_1;
    	let current;

    	ripple_1 = new Ripple$1({
    			props: { center: false, circle: false },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(ripple_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(ripple_1, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ripple_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ripple_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(ripple_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(121:2) {#if ripple}",
    		ctx
    	});

    	return block;
    }

    // (128:30) 
    function create_if_block_7(ctx) {
    	let span;
    	let current;
    	const rightIcon_slot_template = /*#slots*/ ctx[28].rightIcon;
    	const rightIcon_slot = create_slot(rightIcon_slot_template, ctx, /*$$scope*/ ctx[27], get_rightIcon_slot_context_1);
    	const rightIcon_slot_or_fallback = rightIcon_slot || fallback_block_3(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (rightIcon_slot_or_fallback) rightIcon_slot_or_fallback.c();
    			attr_dev(span, "class", "right-section svelte-5xpm5q");
    			add_location(span, file$g, 128, 3, 3999);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (rightIcon_slot_or_fallback) {
    				rightIcon_slot_or_fallback.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (rightIcon_slot) {
    				if (rightIcon_slot.p && (!current || dirty & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						rightIcon_slot,
    						rightIcon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[27],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[27])
    						: get_slot_changes(rightIcon_slot_template, /*$$scope*/ ctx[27], dirty, get_rightIcon_slot_changes_1),
    						get_rightIcon_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rightIcon_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rightIcon_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (rightIcon_slot_or_fallback) rightIcon_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(128:30) ",
    		ctx
    	});

    	return block;
    }

    // (124:2) {#if loading && loaderPosition === 'right'}
    function create_if_block_6$1(ctx) {
    	let span;
    	let loader;
    	let current;

    	loader = new Loader$1({
    			props: {
    				variant: /*loaderProps*/ ctx[6].variant,
    				size: /*loaderProps*/ ctx[6].size,
    				color: /*loaderProps*/ ctx[6].color
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(loader.$$.fragment);
    			attr_dev(span, "class", "right-section svelte-5xpm5q");
    			add_location(span, file$g, 124, 3, 3830);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(loader, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const loader_changes = {};
    			if (dirty & /*loaderProps*/ 64) loader_changes.variant = /*loaderProps*/ ctx[6].variant;
    			if (dirty & /*loaderProps*/ 64) loader_changes.size = /*loaderProps*/ ctx[6].size;
    			if (dirty & /*loaderProps*/ 64) loader_changes.color = /*loaderProps*/ ctx[6].color;
    			loader.$set(loader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(loader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6$1.name,
    		type: "if",
    		source: "(124:2) {#if loading && loaderPosition === 'right'}",
    		ctx
    	});

    	return block;
    }

    // (130:27) X
    function fallback_block_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("X");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_3.name,
    		type: "fallback",
    		source: "(130:27) X",
    		ctx
    	});

    	return block;
    }

    // (77:29) 
    function create_if_block_5$3(ctx) {
    	let span;
    	let current;
    	const leftIcon_slot_template = /*#slots*/ ctx[28].leftIcon;
    	const leftIcon_slot = create_slot(leftIcon_slot_template, ctx, /*$$scope*/ ctx[27], get_leftIcon_slot_context);
    	const leftIcon_slot_or_fallback = leftIcon_slot || fallback_block_2(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (leftIcon_slot_or_fallback) leftIcon_slot_or_fallback.c();
    			attr_dev(span, "class", "left-section svelte-5xpm5q");
    			add_location(span, file$g, 77, 3, 2592);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (leftIcon_slot_or_fallback) {
    				leftIcon_slot_or_fallback.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (leftIcon_slot) {
    				if (leftIcon_slot.p && (!current || dirty & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						leftIcon_slot,
    						leftIcon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[27],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[27])
    						: get_slot_changes(leftIcon_slot_template, /*$$scope*/ ctx[27], dirty, get_leftIcon_slot_changes),
    						get_leftIcon_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftIcon_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftIcon_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (leftIcon_slot_or_fallback) leftIcon_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$3.name,
    		type: "if",
    		source: "(77:29) ",
    		ctx
    	});

    	return block;
    }

    // (73:2) {#if loading && loaderPosition === 'left'}
    function create_if_block_4$3(ctx) {
    	let span;
    	let loader;
    	let current;

    	loader = new Loader$1({
    			props: {
    				variant: /*loaderProps*/ ctx[6].variant,
    				size: /*loaderProps*/ ctx[6].size,
    				color: /*loaderProps*/ ctx[6].color
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(loader.$$.fragment);
    			attr_dev(span, "class", "left-section svelte-5xpm5q");
    			add_location(span, file$g, 73, 3, 2425);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(loader, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const loader_changes = {};
    			if (dirty & /*loaderProps*/ 64) loader_changes.variant = /*loaderProps*/ ctx[6].variant;
    			if (dirty & /*loaderProps*/ 64) loader_changes.size = /*loaderProps*/ ctx[6].size;
    			if (dirty & /*loaderProps*/ 64) loader_changes.color = /*loaderProps*/ ctx[6].color;
    			loader.$set(loader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(loader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$3.name,
    		type: "if",
    		source: "(73:2) {#if loading && loaderPosition === 'left'}",
    		ctx
    	});

    	return block;
    }

    // (79:26) X
    function fallback_block_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("X");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_2.name,
    		type: "fallback",
    		source: "(79:26) X",
    		ctx
    	});

    	return block;
    }

    // (82:8) Button
    function fallback_block_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Button");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_1.name,
    		type: "fallback",
    		source: "(82:8) Button",
    		ctx
    	});

    	return block;
    }

    // (83:2) {#if ripple}
    function create_if_block_3$4(ctx) {
    	let ripple_1;
    	let current;

    	ripple_1 = new Ripple$1({
    			props: { center: false, circle: false },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(ripple_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(ripple_1, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ripple_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ripple_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(ripple_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$4.name,
    		type: "if",
    		source: "(83:2) {#if ripple}",
    		ctx
    	});

    	return block;
    }

    // (90:30) 
    function create_if_block_2$6(ctx) {
    	let span;
    	let current;
    	const rightIcon_slot_template = /*#slots*/ ctx[28].rightIcon;
    	const rightIcon_slot = create_slot(rightIcon_slot_template, ctx, /*$$scope*/ ctx[27], get_rightIcon_slot_context);
    	const rightIcon_slot_or_fallback = rightIcon_slot || fallback_block$4(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (rightIcon_slot_or_fallback) rightIcon_slot_or_fallback.c();
    			attr_dev(span, "class", "right-section svelte-5xpm5q");
    			add_location(span, file$g, 90, 3, 2981);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (rightIcon_slot_or_fallback) {
    				rightIcon_slot_or_fallback.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (rightIcon_slot) {
    				if (rightIcon_slot.p && (!current || dirty & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						rightIcon_slot,
    						rightIcon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[27],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[27])
    						: get_slot_changes(rightIcon_slot_template, /*$$scope*/ ctx[27], dirty, get_rightIcon_slot_changes),
    						get_rightIcon_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rightIcon_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rightIcon_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (rightIcon_slot_or_fallback) rightIcon_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$6.name,
    		type: "if",
    		source: "(90:30) ",
    		ctx
    	});

    	return block;
    }

    // (86:2) {#if loading && loaderPosition === 'right'}
    function create_if_block_1$9(ctx) {
    	let span;
    	let loader;
    	let current;

    	loader = new Loader$1({
    			props: {
    				variant: /*loaderProps*/ ctx[6].variant,
    				size: /*loaderProps*/ ctx[6].size,
    				color: /*loaderProps*/ ctx[6].color
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(loader.$$.fragment);
    			attr_dev(span, "class", "right-section svelte-5xpm5q");
    			add_location(span, file$g, 86, 3, 2812);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(loader, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const loader_changes = {};
    			if (dirty & /*loaderProps*/ 64) loader_changes.variant = /*loaderProps*/ ctx[6].variant;
    			if (dirty & /*loaderProps*/ 64) loader_changes.size = /*loaderProps*/ ctx[6].size;
    			if (dirty & /*loaderProps*/ 64) loader_changes.color = /*loaderProps*/ ctx[6].color;
    			loader.$set(loader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(loader);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$9.name,
    		type: "if",
    		source: "(86:2) {#if loading && loaderPosition === 'right'}",
    		ctx
    	});

    	return block;
    }

    // (92:27) X
    function fallback_block$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("X");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$4.name,
    		type: "fallback",
    		source: "(92:27) X",
    		ctx
    	});

    	return block;
    }

    function create_fragment$v(ctx) {
    	let error;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	error = new Error$2({
    			props: {
    				observable: /*observable*/ ctx[14],
    				component: "Button",
    				code: /*err*/ ctx[15]
    			},
    			$$inline: true
    		});

    	const if_block_creators = [create_if_block$h, create_else_block$9];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*href*/ ctx[7]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			create_component(error.$$.fragment);
    			t = space();
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1$2("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(error, target, anchor);
    			insert_dev(target, t, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const error_changes = {};
    			if (dirty & /*observable*/ 16384) error_changes.observable = /*observable*/ ctx[14];
    			if (dirty & /*err*/ 32768) error_changes.code = /*err*/ ctx[15];
    			error.$set(error_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(error.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(error.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(error, detaching);
    			if (detaching) detach_dev(t);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;

    	const omit_props_names = [
    		"use","element","class","override","variant","color","size","radius","gradient","loaderPosition","loaderProps","href","external","disabled","compact","loading","uppercase","fullSize","ripple"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['leftIcon','default','rightIcon']);
    	const $$slots = compute_slots(slots);

    	let { use = [], element = undefined, class: className = '', override = {}, variant = 'filled', color = 'blue', size = 'sm', radius = 'sm', gradient = { from: 'indigo', to: 'cyan', deg: 45 }, loaderPosition = 'left', loaderProps = {
    		size: 'xs',
    		color: 'white',
    		variant: 'circle'
    	}, href = null, external = false, disabled = false, compact = false, loading = false, uppercase = false, fullSize = false, ripple = false } = $$props;

    	/** An action that forwards inner dom node events from parent component */
    	const forwardEvents = createEventForwarder(get_current_component());

    	// --------------Error Handling-------------------
    	let observable = false;

    	let err;

    	if (disabled && loading) {
    		observable = true;
    		err = ButtonErrors[0];
    	}

    	if (external && typeof href !== 'string' || href?.length < 1) {
    		observable = true;
    		err = ButtonErrors[1];
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	function button_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(20, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(1, override = $$new_props.override);
    		if ('variant' in $$new_props) $$invalidate(4, variant = $$new_props.variant);
    		if ('color' in $$new_props) $$invalidate(22, color = $$new_props.color);
    		if ('size' in $$new_props) $$invalidate(23, size = $$new_props.size);
    		if ('radius' in $$new_props) $$invalidate(24, radius = $$new_props.radius);
    		if ('gradient' in $$new_props) $$invalidate(25, gradient = $$new_props.gradient);
    		if ('loaderPosition' in $$new_props) $$invalidate(5, loaderPosition = $$new_props.loaderPosition);
    		if ('loaderProps' in $$new_props) $$invalidate(6, loaderProps = $$new_props.loaderProps);
    		if ('href' in $$new_props) $$invalidate(7, href = $$new_props.href);
    		if ('external' in $$new_props) $$invalidate(8, external = $$new_props.external);
    		if ('disabled' in $$new_props) $$invalidate(9, disabled = $$new_props.disabled);
    		if ('compact' in $$new_props) $$invalidate(10, compact = $$new_props.compact);
    		if ('loading' in $$new_props) $$invalidate(11, loading = $$new_props.loading);
    		if ('uppercase' in $$new_props) $$invalidate(12, uppercase = $$new_props.uppercase);
    		if ('fullSize' in $$new_props) $$invalidate(26, fullSize = $$new_props.fullSize);
    		if ('ripple' in $$new_props) $$invalidate(13, ripple = $$new_props.ripple);
    		if ('$$scope' in $$new_props) $$invalidate(27, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$h,
    		get_current_component,
    		createEventForwarder,
    		useActions,
    		ButtonErrors,
    		Error: Error$2,
    		Loader: Loader$1,
    		Ripple: Ripple$1,
    		use,
    		element,
    		className,
    		override,
    		variant,
    		color,
    		size,
    		radius,
    		gradient,
    		loaderPosition,
    		loaderProps,
    		href,
    		external,
    		disabled,
    		compact,
    		loading,
    		uppercase,
    		fullSize,
    		ripple,
    		forwardEvents,
    		observable,
    		err,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(1, override = $$new_props.override);
    		if ('variant' in $$props) $$invalidate(4, variant = $$new_props.variant);
    		if ('color' in $$props) $$invalidate(22, color = $$new_props.color);
    		if ('size' in $$props) $$invalidate(23, size = $$new_props.size);
    		if ('radius' in $$props) $$invalidate(24, radius = $$new_props.radius);
    		if ('gradient' in $$props) $$invalidate(25, gradient = $$new_props.gradient);
    		if ('loaderPosition' in $$props) $$invalidate(5, loaderPosition = $$new_props.loaderPosition);
    		if ('loaderProps' in $$props) $$invalidate(6, loaderProps = $$new_props.loaderProps);
    		if ('href' in $$props) $$invalidate(7, href = $$new_props.href);
    		if ('external' in $$props) $$invalidate(8, external = $$new_props.external);
    		if ('disabled' in $$props) $$invalidate(9, disabled = $$new_props.disabled);
    		if ('compact' in $$props) $$invalidate(10, compact = $$new_props.compact);
    		if ('loading' in $$props) $$invalidate(11, loading = $$new_props.loading);
    		if ('uppercase' in $$props) $$invalidate(12, uppercase = $$new_props.uppercase);
    		if ('fullSize' in $$props) $$invalidate(26, fullSize = $$new_props.fullSize);
    		if ('ripple' in $$props) $$invalidate(13, ripple = $$new_props.ripple);
    		if ('observable' in $$props) $$invalidate(14, observable = $$new_props.observable);
    		if ('err' in $$props) $$invalidate(15, err = $$new_props.err);
    		if ('getStyles' in $$props) $$invalidate(16, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(17, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(18, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*observable*/ 16384) {
    			if (observable) $$invalidate(1, override = { display: 'none' });
    		}

    		if ($$self.$$.dirty & /*color, compact, fullSize, gradient, radius, size, variant*/ 130024464) {
    			// --------------Error Handling-------------------
    			$$invalidate(
    				18,
    				{ cx, classes, getStyles } = useStyles$h(
    					{
    						color,
    						compact,
    						fullSize,
    						gradient,
    						radius,
    						size,
    						variant
    					},
    					{ name: 'Button' }
    				),
    				cx,
    				((((((($$invalidate(17, classes), $$invalidate(22, color)), $$invalidate(10, compact)), $$invalidate(26, fullSize)), $$invalidate(25, gradient)), $$invalidate(24, radius)), $$invalidate(23, size)), $$invalidate(4, variant)),
    				((((((($$invalidate(16, getStyles), $$invalidate(22, color)), $$invalidate(10, compact)), $$invalidate(26, fullSize)), $$invalidate(25, gradient)), $$invalidate(24, radius)), $$invalidate(23, size)), $$invalidate(4, variant))
    			);
    		}
    	};

    	return [
    		element,
    		override,
    		use,
    		className,
    		variant,
    		loaderPosition,
    		loaderProps,
    		href,
    		external,
    		disabled,
    		compact,
    		loading,
    		uppercase,
    		ripple,
    		observable,
    		err,
    		getStyles,
    		classes,
    		cx,
    		forwardEvents,
    		$$restProps,
    		$$slots,
    		color,
    		size,
    		radius,
    		gradient,
    		fullSize,
    		$$scope,
    		slots,
    		a_binding,
    		button_binding
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$v, create_fragment$v, safe_not_equal, {
    			use: 2,
    			element: 0,
    			class: 3,
    			override: 1,
    			variant: 4,
    			color: 22,
    			size: 23,
    			radius: 24,
    			gradient: 25,
    			loaderPosition: 5,
    			loaderProps: 6,
    			href: 7,
    			external: 8,
    			disabled: 9,
    			compact: 10,
    			loading: 11,
    			uppercase: 12,
    			fullSize: 26,
    			ripple: 13
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$v.name
    		});
    	}

    	get use() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radius() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radius(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gradient() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gradient(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get loaderPosition() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set loaderPosition(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get loaderProps() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set loaderProps(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get external() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set external(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get compact() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set compact(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get loading() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set loading(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get uppercase() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set uppercase(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullSize() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullSize(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ripple() {
    		throw new Error_1$2("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ripple(value) {
    		throw new Error_1$2("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Button$1 = Button;

    const sizes$6 = {
        xs: 18,
        sm: 22,
        md: 28,
        lg: 34,
        xl: 44
    };
    function getVariantStyles$1(color) {
        const { themeColor } = fns;
        const variants = vFunc(color);
        return {
            ...variants,
            hover: {
                [`${dark.selector} &`]: {
                    color: themeColor(color, 2),
                    '&:hover': { backgroundColor: themeColor('dark', 8) }
                },
                border: '1px solid transparent',
                backgroundColor: 'transparent',
                color: themeColor(color, 7),
                '&:hover': { backgroundColor: themeColor(color) }
            },
            transparent: {
                [`${dark.selector} &`]: {
                    color: themeColor(color, 8),
                    '&:hover': { backgroundColor: null }
                },
                border: '1px solid transparent',
                backgroundColor: 'transparent',
                color: themeColor(color, 7),
                '&:hover': { backgroundColor: null }
            }
        };
    }
    var useStyles$g = createStyles((theme, { color, radius, size }) => {
        return {
            root: {
                focusRing: 'auto',
                position: 'relative',
                appearance: 'none',
                WebkitAppearance: 'none',
                WebkitTapHighlightColor: 'transparent',
                boxSizing: 'border-box',
                height: typeof size === 'string' ? sizes$6[size] : `${size}px`,
                minHeight: typeof size === 'string' ? sizes$6[size] : `${size}px`,
                width: typeof size === 'string' ? sizes$6[size] : `${size}px`,
                minWidth: typeof size === 'string' ? sizes$6[size] : `${size}px`,
                borderRadius: `$${radius}`,
                padding: 0,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:not(:disabled):active': {
                    transform: 'translateY(1px)'
                },
                '&:disabled': {
                    pointerEvents: 'none',
                    borderColor: 'transparent',
                    background: theme.fn.themeColor('gray', 2),
                    backgroundColor: theme.fn.themeColor('gray', 2),
                    color: theme.fn.themeColor('gray', 5),
                    cursor: 'not-allowed',
                    darkMode: {
                        borderColor: 'transparent',
                        backgroundColor: theme.fn.themeColor('dark', 4),
                        color: theme.fn.themeColor('dark', 6)
                    }
                }
            },
            loading: {
                pointerEvents: 'none',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    right: -1,
                    bottom: -1,
                    backgroundColor: 'rgba(255, 255, 255, .5)',
                    borderRadius: `$${radius}`,
                    cursor: 'not-allowed'
                }
            },
            variants: {
                variation: getVariantStyles$1(color)
            }
        };
    });

    /** Error codes for component Text
     *
     * `Object.freeze` is needed to keep modification outside of the object unavailable
     *
     * ## Code 1:
     * If using the 'href' prop, set 'root' prop to an anchor ('a') tag
     *
     */
    const ActionIconErrors = Object.freeze([
        {
            error: true,
            message: "If using the 'href' prop, set 'root' prop to an anchor ('a') tag",
            solution: `
                If your component looks like this:

                &lt;ActionIcon href='https://example.com'&gt;
                          ^^^ - Try adding prop root='a'
                       &lt;Icon /&gt;
                &lt;/ActionIcon&gt;
                `
        }
    ]);

    /* ../node_modules/@svelteuidev/core/dist/components/ActionIcon/ActionIcon.svelte generated by Svelte v3.59.2 */

    const { Error: Error_1$1 } = globals;

    // (63:1) {:else}
    function create_else_block$8(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[21].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[23], null);
    	const default_slot_or_fallback = default_slot || fallback_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8388608)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[23],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[23])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[23], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$8.name,
    		type: "else",
    		source: "(63:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (61:1) {#if loading}
    function create_if_block$g(ctx) {
    	let loader;
    	let current;

    	loader = new Loader$1({
    			props: {
    				size: /*loaderProps*/ ctx[6].size,
    				color: /*loaderProps*/ ctx[6].color,
    				variant: /*loaderProps*/ ctx[6].variant
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(loader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(loader, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const loader_changes = {};
    			if (dirty & /*loaderProps*/ 64) loader_changes.size = /*loaderProps*/ ctx[6].size;
    			if (dirty & /*loaderProps*/ 64) loader_changes.color = /*loaderProps*/ ctx[6].color;
    			if (dirty & /*loaderProps*/ 64) loader_changes.variant = /*loaderProps*/ ctx[6].variant;
    			loader.$set(loader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(loader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$g.name,
    		type: "if",
    		source: "(61:1) {#if loading}",
    		ctx
    	});

    	return block;
    }

    // (64:8) +
    function fallback_block$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("+");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$3.name,
    		type: "fallback",
    		source: "(64:8) +",
    		ctx
    	});

    	return block;
    }

    // (44:0) <Box  bind:element  use={[forwardEvents, [useActions, use]]}  tabindex={0}  disabled={disabled || loading}  class={cx(   className,   classes.root,   { [classes.loading]: loading },   getStyles({ css: override, variation: variant })  )}  target={external ? '_blank' : null}  rel={external ? 'noreferrer noopener' : null}  {root}  {href}  {...$$restProps} >
    function create_default_slot$p(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$g, create_else_block$8];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*loading*/ ctx[7]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$p.name,
    		type: "slot",
    		source: "(44:0) <Box  bind:element  use={[forwardEvents, [useActions, use]]}  tabindex={0}  disabled={disabled || loading}  class={cx(   className,   classes.root,   { [classes.loading]: loading },   getStyles({ css: override, variation: variant })  )}  target={external ? '_blank' : null}  rel={external ? 'noreferrer noopener' : null}  {root}  {href}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
    	let error;
    	let t;
    	let box;
    	let updating_element;
    	let current;

    	error = new Error$2({
    			props: {
    				observable: /*observable*/ ctx[11],
    				component: "ActionIcon",
    				code: /*err*/ ctx[12]
    			},
    			$$inline: true
    		});

    	const box_spread_levels = [
    		{
    			use: [/*forwardEvents*/ ctx[16], [useActions, /*use*/ ctx[2]]]
    		},
    		{ tabindex: 0 },
    		{
    			disabled: /*disabled*/ ctx[8] || /*loading*/ ctx[7]
    		},
    		{
    			class: /*cx*/ ctx[15](
    				/*className*/ ctx[3],
    				/*classes*/ ctx[14].root,
    				{
    					[/*classes*/ ctx[14].loading]: /*loading*/ ctx[7]
    				},
    				/*getStyles*/ ctx[13]({
    					css: /*override*/ ctx[1],
    					variation: /*variant*/ ctx[5]
    				})
    			)
    		},
    		{
    			target: /*external*/ ctx[10] ? '_blank' : null
    		},
    		{
    			rel: /*external*/ ctx[10] ? 'noreferrer noopener' : null
    		},
    		{ root: /*root*/ ctx[4] },
    		{ href: /*href*/ ctx[9] },
    		/*$$restProps*/ ctx[17]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[22](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$p] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(error.$$.fragment);
    			t = space();
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(error, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const error_changes = {};
    			if (dirty & /*observable*/ 2048) error_changes.observable = /*observable*/ ctx[11];
    			if (dirty & /*err*/ 4096) error_changes.code = /*err*/ ctx[12];
    			error.$set(error_changes);

    			const box_changes = (dirty & /*forwardEvents, useActions, use, disabled, loading, cx, className, classes, getStyles, override, variant, external, root, href, $$restProps*/ 255934)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*forwardEvents, useActions, use*/ 65540 && {
    						use: [/*forwardEvents*/ ctx[16], [useActions, /*use*/ ctx[2]]]
    					},
    					box_spread_levels[1],
    					dirty & /*disabled, loading*/ 384 && {
    						disabled: /*disabled*/ ctx[8] || /*loading*/ ctx[7]
    					},
    					dirty & /*cx, className, classes, loading, getStyles, override, variant*/ 57514 && {
    						class: /*cx*/ ctx[15](
    							/*className*/ ctx[3],
    							/*classes*/ ctx[14].root,
    							{
    								[/*classes*/ ctx[14].loading]: /*loading*/ ctx[7]
    							},
    							/*getStyles*/ ctx[13]({
    								css: /*override*/ ctx[1],
    								variation: /*variant*/ ctx[5]
    							})
    						)
    					},
    					dirty & /*external*/ 1024 && {
    						target: /*external*/ ctx[10] ? '_blank' : null
    					},
    					dirty & /*external*/ 1024 && {
    						rel: /*external*/ ctx[10] ? 'noreferrer noopener' : null
    					},
    					dirty & /*root*/ 16 && { root: /*root*/ ctx[4] },
    					dirty & /*href*/ 512 && { href: /*href*/ ctx[9] },
    					dirty & /*$$restProps*/ 131072 && get_spread_object(/*$$restProps*/ ctx[17])
    				])
    			: {};

    			if (dirty & /*$$scope, loaderProps, loading*/ 8388800) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(error.$$.fragment, local);
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(error.$$.fragment, local);
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(error, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;

    	const omit_props_names = [
    		"use","element","class","override","root","color","variant","size","radius","loaderProps","loading","disabled","href","external"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ActionIcon', slots, ['default']);

    	let { use = [], element = undefined, class: className = '', override = {}, root = 'button', color = 'gray', variant = 'hover', size = 'md', radius = 'sm', loaderProps = {
    		size: 'xs',
    		color: 'gray',
    		variant: 'circle'
    	}, loading = false, disabled = false, href = '', external = false } = $$props;

    	const forwardEvents = createEventForwarder(get_current_component());

    	// --------------Error Handling-------------------
    	let observable = false;

    	let err;

    	if (root !== 'a' && $$props.href) {
    		observable = true;
    		err = ActionIconErrors[0];
    	}

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(24, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(17, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(1, override = $$new_props.override);
    		if ('root' in $$new_props) $$invalidate(4, root = $$new_props.root);
    		if ('color' in $$new_props) $$invalidate(18, color = $$new_props.color);
    		if ('variant' in $$new_props) $$invalidate(5, variant = $$new_props.variant);
    		if ('size' in $$new_props) $$invalidate(19, size = $$new_props.size);
    		if ('radius' in $$new_props) $$invalidate(20, radius = $$new_props.radius);
    		if ('loaderProps' in $$new_props) $$invalidate(6, loaderProps = $$new_props.loaderProps);
    		if ('loading' in $$new_props) $$invalidate(7, loading = $$new_props.loading);
    		if ('disabled' in $$new_props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ('href' in $$new_props) $$invalidate(9, href = $$new_props.href);
    		if ('external' in $$new_props) $$invalidate(10, external = $$new_props.external);
    		if ('$$scope' in $$new_props) $$invalidate(23, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$g,
    		ActionIconErrors,
    		createEventForwarder,
    		useActions,
    		get_current_component,
    		Box: Box$1,
    		Loader: Loader$1,
    		Error: Error$2,
    		use,
    		element,
    		className,
    		override,
    		root,
    		color,
    		variant,
    		size,
    		radius,
    		loaderProps,
    		loading,
    		disabled,
    		href,
    		external,
    		forwardEvents,
    		observable,
    		err,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(24, $$props = assign(assign({}, $$props), $$new_props));
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(1, override = $$new_props.override);
    		if ('root' in $$props) $$invalidate(4, root = $$new_props.root);
    		if ('color' in $$props) $$invalidate(18, color = $$new_props.color);
    		if ('variant' in $$props) $$invalidate(5, variant = $$new_props.variant);
    		if ('size' in $$props) $$invalidate(19, size = $$new_props.size);
    		if ('radius' in $$props) $$invalidate(20, radius = $$new_props.radius);
    		if ('loaderProps' in $$props) $$invalidate(6, loaderProps = $$new_props.loaderProps);
    		if ('loading' in $$props) $$invalidate(7, loading = $$new_props.loading);
    		if ('disabled' in $$props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ('href' in $$props) $$invalidate(9, href = $$new_props.href);
    		if ('external' in $$props) $$invalidate(10, external = $$new_props.external);
    		if ('observable' in $$props) $$invalidate(11, observable = $$new_props.observable);
    		if ('err' in $$props) $$invalidate(12, err = $$new_props.err);
    		if ('getStyles' in $$props) $$invalidate(13, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(14, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(15, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*observable*/ 2048) {
    			if (observable) $$invalidate(1, override = { display: 'none' });
    		}

    		if ($$self.$$.dirty & /*color, radius, size*/ 1835008) {
    			// --------------End Error Handling-------------------
    			$$invalidate(15, { cx, classes, getStyles } = useStyles$g({ color, radius, size }, { name: 'ActionIcon' }), cx, ((($$invalidate(14, classes), $$invalidate(18, color)), $$invalidate(20, radius)), $$invalidate(19, size)), ((($$invalidate(13, getStyles), $$invalidate(18, color)), $$invalidate(20, radius)), $$invalidate(19, size)));
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		element,
    		override,
    		use,
    		className,
    		root,
    		variant,
    		loaderProps,
    		loading,
    		disabled,
    		href,
    		external,
    		observable,
    		err,
    		getStyles,
    		classes,
    		cx,
    		forwardEvents,
    		$$restProps,
    		color,
    		size,
    		radius,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class ActionIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$u, create_fragment$u, safe_not_equal, {
    			use: 2,
    			element: 0,
    			class: 3,
    			override: 1,
    			root: 4,
    			color: 18,
    			variant: 5,
    			size: 19,
    			radius: 20,
    			loaderProps: 6,
    			loading: 7,
    			disabled: 8,
    			href: 9,
    			external: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ActionIcon",
    			options,
    			id: create_fragment$u.name
    		});
    	}

    	get use() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get root() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set root(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radius() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radius(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get loaderProps() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set loaderProps(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get loading() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set loading(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get external() {
    		throw new Error_1$1("<ActionIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set external(value) {
    		throw new Error_1$1("<ActionIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ActionIcon$1 = ActionIcon;

    var useStyles$f = createStyles((theme, { iconSize }) => {
        return {
            root: {
                focusRing: 'auto',
                position: 'relative',
                appearance: 'none',
                WebkitAppearance: 'none',
                WebkitTapHighlightColor: 'transparent',
                boxSizing: 'border-box',
                height: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
                minHeight: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
                width: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
                minWidth: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
                padding: 0,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                textDecoration: 'none'
            },
            icon: {
                height: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
                minHeight: `${theme.fn.size({ size: iconSize, sizes: theme.space })}px`,
                position: 'static',
                margin: 0,
                ml: 0,
                mr: 0,
                mt: 0,
                mb: 0
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/IconRenderer/IconRenderer.svelte generated by Svelte v3.59.2 */
    const file$f = "../node_modules/@svelteuidev/core/dist/components/IconRenderer/IconRenderer.svelte";

    // (17:24) 
    function create_if_block_1$8(ctx) {
    	let if_block_anchor;
    	let if_block = (/*icon*/ ctx[2] instanceof HTMLElement || /*icon*/ ctx[2] instanceof SVGElement) && create_if_block_2$5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*icon*/ ctx[2] instanceof HTMLElement || /*icon*/ ctx[2] instanceof SVGElement) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2$5(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$8.name,
    		type: "if",
    		source: "(17:24) ",
    		ctx
    	});

    	return block;
    }

    // (11:0) {#if typeof icon === 'function'}
    function create_if_block$f(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			class: /*cx*/ ctx[6](/*className*/ ctx[0], /*classes*/ ctx[4].root, /*getStyles*/ ctx[5]({ css: /*override*/ ctx[1] }))
    		},
    		/*iconProps*/ ctx[3]
    	];

    	var switch_value = /*icon*/ ctx[2];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*cx, className, classes, getStyles, override, iconProps*/ 123)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*cx, className, classes, getStyles, override*/ 115 && {
    						class: /*cx*/ ctx[6](/*className*/ ctx[0], /*classes*/ ctx[4].root, /*getStyles*/ ctx[5]({ css: /*override*/ ctx[1] }))
    					},
    					dirty & /*iconProps*/ 8 && get_spread_object(/*iconProps*/ ctx[3])
    				])
    			: {};

    			if (dirty & /*icon*/ 4 && switch_value !== (switch_value = /*icon*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$f.name,
    		type: "if",
    		source: "(11:0) {#if typeof icon === 'function'}",
    		ctx
    	});

    	return block;
    }

    // (18:1) {#if icon instanceof HTMLElement || icon instanceof SVGElement}
    function create_if_block_2$5(ctx) {
    	let span;
    	let raw_value = /*icon*/ ctx[2].outerHTML + "";
    	let span_class_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			attr_dev(span, "class", span_class_value = /*cx*/ ctx[6](/*className*/ ctx[0], /*classes*/ ctx[4].root, /*getStyles*/ ctx[5]({ css: /*override*/ ctx[1] })));
    			add_location(span, file$f, 18, 2, 796);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			span.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icon*/ 4 && raw_value !== (raw_value = /*icon*/ ctx[2].outerHTML + "")) span.innerHTML = raw_value;
    			if (dirty & /*cx, className, classes, getStyles, override*/ 115 && span_class_value !== (span_class_value = /*cx*/ ctx[6](/*className*/ ctx[0], /*classes*/ ctx[4].root, /*getStyles*/ ctx[5]({ css: /*override*/ ctx[1] })))) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$5.name,
    		type: "if",
    		source: "(18:1) {#if icon instanceof HTMLElement || icon instanceof SVGElement}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$t(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$f, create_if_block_1$8];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (typeof /*icon*/ ctx[2] === 'function') return 0;
    		if (!/*requiresShim*/ ctx[7]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let cx;
    	let getStyles;
    	let classes;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('IconRenderer', slots, []);
    	let { className = '', override = {}, icon = undefined, iconSize = 16, iconProps = {} } = $$props;

    	// Verifies if CSR only elements are defined, or else it won't use them
    	const requiresShim = typeof HTMLElement === 'undefined' && typeof SVGElement === 'undefined';

    	const writable_props = ['className', 'override', 'icon', 'iconSize', 'iconProps'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IconRenderer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('override' in $$props) $$invalidate(1, override = $$props.override);
    		if ('icon' in $$props) $$invalidate(2, icon = $$props.icon);
    		if ('iconSize' in $$props) $$invalidate(8, iconSize = $$props.iconSize);
    		if ('iconProps' in $$props) $$invalidate(3, iconProps = $$props.iconProps);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$f,
    		className,
    		override,
    		icon,
    		iconSize,
    		iconProps,
    		requiresShim,
    		classes,
    		getStyles,
    		cx
    	});

    	$$self.$inject_state = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('override' in $$props) $$invalidate(1, override = $$props.override);
    		if ('icon' in $$props) $$invalidate(2, icon = $$props.icon);
    		if ('iconSize' in $$props) $$invalidate(8, iconSize = $$props.iconSize);
    		if ('iconProps' in $$props) $$invalidate(3, iconProps = $$props.iconProps);
    		if ('classes' in $$props) $$invalidate(4, classes = $$props.classes);
    		if ('getStyles' in $$props) $$invalidate(5, getStyles = $$props.getStyles);
    		if ('cx' in $$props) $$invalidate(6, cx = $$props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*iconSize*/ 256) {
    			$$invalidate(6, { cx, getStyles, classes } = useStyles$f({ iconSize }, { name: 'IconRenderer' }), cx, ($$invalidate(5, getStyles), $$invalidate(8, iconSize)), ($$invalidate(4, classes), $$invalidate(8, iconSize)));
    		}

    		if ($$self.$$.dirty & /*icon, classes*/ 20) {
    			if (!requiresShim && (icon instanceof HTMLElement || icon instanceof SVGElement)) {
    				icon.classList.add(...classes.icon.split(' '));
    			}
    		}
    	};

    	return [
    		className,
    		override,
    		icon,
    		iconProps,
    		classes,
    		getStyles,
    		cx,
    		requiresShim,
    		iconSize
    	];
    }

    class IconRenderer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$t, create_fragment$t, safe_not_equal, {
    			className: 0,
    			override: 1,
    			icon: 2,
    			iconSize: 8,
    			iconProps: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "IconRenderer",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get className() {
    		throw new Error("<IconRenderer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<IconRenderer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<IconRenderer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<IconRenderer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<IconRenderer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<IconRenderer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconSize() {
    		throw new Error("<IconRenderer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconSize(value) {
    		throw new Error("<IconRenderer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconProps() {
    		throw new Error("<IconRenderer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconProps(value) {
    		throw new Error("<IconRenderer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var IconRenderer$1 = IconRenderer;

    function getTextColor(theme, color, variant, gradient, dark = false) {
        if (color === 'dimmed')
            return dark ? theme.fn.themeColor('dark', 2) : theme.fn.themeColor('gray', 6);
        if (variant === 'gradient' || gradient)
            return theme.fn.themeColor(color, 6);
        if (variant === 'link')
            return dark ? theme.fn.themeColor('blue', 4) : theme.fn.themeColor('blue', 7);
        if (variant === 'text')
            return dark ? theme.fn.themeColor(color, 5) : theme.fn.themeColor(color, 7);
    }
    var useStyles$e = createStyles((theme, { align, color, inherit, inline, lineClamp, size, tracking, transform, underline, weight, gradient, variant }) => {
        return {
            root: {
                focusRing: 'auto',
                [`${theme.dark} &`]: {
                    color: color === 'dark' ? '$dark50' : getTextColor(theme, color, variant, gradient, true)
                },
                fontFamily: inherit ? 'inherit' : '$standard',
                fontSize: inherit ? 'inherit' : typeof size === 'string' ? `$${size}` : `${size}px`,
                fontWeight: inherit ? 'inherit' : `$${weight}`,
                letterSpacing: theme.letterSpacings[tracking]?.value,
                lineHeight: inherit
                    ? 'inherit'
                    : inline
                        ? 1
                        : typeof size === 'string'
                            ? `$${size}`
                            : `${size}px`,
                textTransform: transform,
                textDecoration: underline ? 'underline' : 'none',
                textAlign: align,
                cursor: variant === 'link' ? 'pointer' : 'inherit',
                color: color === 'green' ? 'Black' : getTextColor(theme, color, variant, gradient),
                backgroundImage: variant === 'gradient'
                    ? `linear-gradient(${gradient?.deg}deg, $${gradient?.from}600 0%, $${gradient?.to}600 100%)`
                    : null,
                WebkitBackgroundClip: variant === 'gradient' ? 'text' : null,
                WebkitTextFillColor: variant === 'gradient' ? 'transparent' : null,
                ...(lineClamp !== undefined
                    ? {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: lineClamp,
                        WebkitBoxOrient: 'vertical'
                    }
                    : {}),
                '&:hover': variant === 'link' && underline === true
                    ? {
                        textDecoration: 'underline'
                    }
                    : undefined
            }
        };
    });

    /** Error codes for component Text
     *
     * `Object.freeze` is needed to keep modification outside of the object unavailable
     *
     * ## Code 1:
     * If using the 'gradient' prop, set 'variant' prop to 'gradient' to apply the gradient
     *
     * ## Code 2:
     * If using the 'link' variant, an href needs to be set and the root must be an anchor
     */
    const TextErrors = Object.freeze([
        {
            error: true,
            message: "If using the 'gradient' prop, set 'variant' prop to 'gradient' to apply the gradient",
            solution: `
                If your component looks like this:

                &lt;Text gradient={{from: 'blue', to: 'red', deg: 45}}&gt;Text string &lt;/Text&gt;
                                                                    ^^^ - Try adding prop variant='gradient'
                `
        },
        {
            error: true,
            message: "If using the 'link' variant, an href needs to be set and the root must be an anchor",
            solution: `
                If your component looks like this:

                &lt;Text variant='link'&gt;Text string &lt;/Text&gt;
                                    ^^^ - Try adding props href && root={'a'}'
                `
        }
    ]);

    /* ../node_modules/@svelteuidev/core/dist/components/Text/Text.svelte generated by Svelte v3.59.2 */

    const { Error: Error_1 } = globals;

    // (55:0) <Box  {root}  bind:element  use={[forwardEvents, [useActions, use]]}  class={cx(className, classes.root, getStyles({ css: override }))}  href={href ?? undefined}  {...$$restProps} >
    function create_default_slot$o(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[25].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[27], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 134217728)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[27],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[27])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[27], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$o.name,
    		type: "slot",
    		source: "(55:0) <Box  {root}  bind:element  use={[forwardEvents, [useActions, use]]}  class={cx(className, classes.root, getStyles({ css: override }))}  href={href ?? undefined}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$s(ctx) {
    	let error;
    	let t;
    	let box;
    	let updating_element;
    	let current;

    	error = new Error$2({
    			props: {
    				observable: /*observable*/ ctx[6],
    				component: "Text",
    				code: /*err*/ ctx[7]
    			},
    			$$inline: true
    		});

    	const box_spread_levels = [
    		{ root: /*root*/ ctx[4] },
    		{
    			use: [/*forwardEvents*/ ctx[11], [useActions, /*use*/ ctx[1]]]
    		},
    		{
    			class: /*cx*/ ctx[10](/*className*/ ctx[2], /*classes*/ ctx[9].root, /*getStyles*/ ctx[8]({ css: /*override*/ ctx[3] }))
    		},
    		{ href: /*href*/ ctx[5] ?? undefined },
    		/*$$restProps*/ ctx[12]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[26](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$o] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(error.$$.fragment);
    			t = space();
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(error, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const error_changes = {};
    			if (dirty & /*observable*/ 64) error_changes.observable = /*observable*/ ctx[6];
    			if (dirty & /*err*/ 128) error_changes.code = /*err*/ ctx[7];
    			error.$set(error_changes);

    			const box_changes = (dirty & /*root, forwardEvents, useActions, use, cx, className, classes, getStyles, override, href, undefined, $$restProps*/ 7998)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*root*/ 16 && { root: /*root*/ ctx[4] },
    					dirty & /*forwardEvents, useActions, use*/ 2050 && {
    						use: [/*forwardEvents*/ ctx[11], [useActions, /*use*/ ctx[1]]]
    					},
    					dirty & /*cx, className, classes, getStyles, override*/ 1804 && {
    						class: /*cx*/ ctx[10](/*className*/ ctx[2], /*classes*/ ctx[9].root, /*getStyles*/ ctx[8]({ css: /*override*/ ctx[3] }))
    					},
    					dirty & /*href, undefined*/ 32 && { href: /*href*/ ctx[5] ?? undefined },
    					dirty & /*$$restProps*/ 4096 && get_spread_object(/*$$restProps*/ ctx[12])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 134217728) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(error.$$.fragment, local);
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(error.$$.fragment, local);
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(error, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;

    	const omit_props_names = [
    		"use","element","class","override","align","color","root","transform","variant","size","weight","gradient","inline","lineClamp","underline","inherit","href","tracking"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Text', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, align = 'left', color = 'dark', root = undefined, transform = 'none', variant = 'text', size = 'md', weight = 'normal', gradient = { from: 'indigo', to: 'cyan', deg: 45 }, inline = true, lineClamp = undefined, underline = false, inherit = false, href = '', tracking = 'normal' } = $$props;

    	/** An action that forwards inner dom node events from parent component */
    	const forwardEvents = createEventForwarder(get_current_component());

    	// --------------Error Handling-------------------
    	let observable = false;

    	let err;

    	if (gradient.from === 'indigo' && gradient.to === 'cyan0' && gradient.deg === 45 && variant !== 'gradient') {
    		observable = true;
    		err = TextErrors[0];
    	}

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('align' in $$new_props) $$invalidate(13, align = $$new_props.align);
    		if ('color' in $$new_props) $$invalidate(14, color = $$new_props.color);
    		if ('root' in $$new_props) $$invalidate(4, root = $$new_props.root);
    		if ('transform' in $$new_props) $$invalidate(15, transform = $$new_props.transform);
    		if ('variant' in $$new_props) $$invalidate(16, variant = $$new_props.variant);
    		if ('size' in $$new_props) $$invalidate(17, size = $$new_props.size);
    		if ('weight' in $$new_props) $$invalidate(18, weight = $$new_props.weight);
    		if ('gradient' in $$new_props) $$invalidate(19, gradient = $$new_props.gradient);
    		if ('inline' in $$new_props) $$invalidate(20, inline = $$new_props.inline);
    		if ('lineClamp' in $$new_props) $$invalidate(21, lineClamp = $$new_props.lineClamp);
    		if ('underline' in $$new_props) $$invalidate(22, underline = $$new_props.underline);
    		if ('inherit' in $$new_props) $$invalidate(23, inherit = $$new_props.inherit);
    		if ('href' in $$new_props) $$invalidate(5, href = $$new_props.href);
    		if ('tracking' in $$new_props) $$invalidate(24, tracking = $$new_props.tracking);
    		if ('$$scope' in $$new_props) $$invalidate(27, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		createEventForwarder,
    		useActions,
    		Error: Error$2,
    		Box: Box$1,
    		useStyles: useStyles$e,
    		TextErrors,
    		use,
    		element,
    		className,
    		override,
    		align,
    		color,
    		root,
    		transform,
    		variant,
    		size,
    		weight,
    		gradient,
    		inline,
    		lineClamp,
    		underline,
    		inherit,
    		href,
    		tracking,
    		forwardEvents,
    		observable,
    		err,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('align' in $$props) $$invalidate(13, align = $$new_props.align);
    		if ('color' in $$props) $$invalidate(14, color = $$new_props.color);
    		if ('root' in $$props) $$invalidate(4, root = $$new_props.root);
    		if ('transform' in $$props) $$invalidate(15, transform = $$new_props.transform);
    		if ('variant' in $$props) $$invalidate(16, variant = $$new_props.variant);
    		if ('size' in $$props) $$invalidate(17, size = $$new_props.size);
    		if ('weight' in $$props) $$invalidate(18, weight = $$new_props.weight);
    		if ('gradient' in $$props) $$invalidate(19, gradient = $$new_props.gradient);
    		if ('inline' in $$props) $$invalidate(20, inline = $$new_props.inline);
    		if ('lineClamp' in $$props) $$invalidate(21, lineClamp = $$new_props.lineClamp);
    		if ('underline' in $$props) $$invalidate(22, underline = $$new_props.underline);
    		if ('inherit' in $$props) $$invalidate(23, inherit = $$new_props.inherit);
    		if ('href' in $$props) $$invalidate(5, href = $$new_props.href);
    		if ('tracking' in $$props) $$invalidate(24, tracking = $$new_props.tracking);
    		if ('observable' in $$props) $$invalidate(6, observable = $$new_props.observable);
    		if ('err' in $$props) $$invalidate(7, err = $$new_props.err);
    		if ('getStyles' in $$props) $$invalidate(8, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(9, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(10, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*lineClamp, underline, inline, inherit, gradient, variant, align, color, transform, size, weight, tracking*/ 33546240) {
    			// --------------End Error Handling-------------------
    			$$invalidate(
    				10,
    				{ cx, classes, getStyles } = useStyles$e(
    					{
    						lineClamp,
    						underline,
    						inline,
    						inherit,
    						gradient,
    						variant,
    						align,
    						color,
    						transform,
    						size,
    						weight,
    						tracking
    					},
    					{ name: 'Text' }
    				),
    				cx,
    				(((((((((((($$invalidate(9, classes), $$invalidate(21, lineClamp)), $$invalidate(22, underline)), $$invalidate(20, inline)), $$invalidate(23, inherit)), $$invalidate(19, gradient)), $$invalidate(16, variant)), $$invalidate(13, align)), $$invalidate(14, color)), $$invalidate(15, transform)), $$invalidate(17, size)), $$invalidate(18, weight)), $$invalidate(24, tracking)),
    				(((((((((((($$invalidate(8, getStyles), $$invalidate(21, lineClamp)), $$invalidate(22, underline)), $$invalidate(20, inline)), $$invalidate(23, inherit)), $$invalidate(19, gradient)), $$invalidate(16, variant)), $$invalidate(13, align)), $$invalidate(14, color)), $$invalidate(15, transform)), $$invalidate(17, size)), $$invalidate(18, weight)), $$invalidate(24, tracking))
    			);
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		root,
    		href,
    		observable,
    		err,
    		getStyles,
    		classes,
    		cx,
    		forwardEvents,
    		$$restProps,
    		align,
    		color,
    		transform,
    		variant,
    		size,
    		weight,
    		gradient,
    		inline,
    		lineClamp,
    		underline,
    		inherit,
    		tracking,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class Text extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$s, create_fragment$s, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			align: 13,
    			color: 14,
    			root: 4,
    			transform: 15,
    			variant: 16,
    			size: 17,
    			weight: 18,
    			gradient: 19,
    			inline: 20,
    			lineClamp: 21,
    			underline: 22,
    			inherit: 23,
    			href: 5,
    			tracking: 24
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Text",
    			options,
    			id: create_fragment$s.name
    		});
    	}

    	get use() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get align() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set align(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get root() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set root(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transform() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transform(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get weight() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set weight(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gradient() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gradient(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lineClamp() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lineClamp(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get underline() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set underline(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inherit() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inherit(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tracking() {
    		throw new Error_1("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tracking(value) {
    		throw new Error_1("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Text$1 = Text;

    var useStyles$d = createStyles((theme, { height, borderPosition, fixed, position, zIndex }) => {
        return {
            root: {
                [`${theme.dark} &`]: {
                    backgroundColor: theme.fn.themeColor('dark', 7),
                    borderBottom: borderPosition === 'bottom' ? `1px solid ${theme.fn.themeColor('dark', 5)}` : undefined,
                    borderTop: borderPosition === 'top' ? `1px solid ${theme.fn.themeColor('dark', 5)}` : undefined
                },
                ...position,
                zIndex,
                height,
                fontFamily: theme.fonts.standard.value ?? 'sans-serif',
                maxHeight: height,
                position: fixed ? 'fixed' : 'static',
                boxSizing: 'border-box',
                backgroundColor: 'white',
                borderBottom: borderPosition === 'bottom' ? `1px solid ${theme.fn.themeColor('gray', 2)}` : undefined,
                borderTop: borderPosition === 'top' ? `1px solid ${theme.fn.themeColor('gray', 2)}` : undefined
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/AppShell/VerticalSection/VerticalSection.svelte generated by Svelte v3.59.2 */

    // (21:0) <Box  {use}  bind:element  root={section === 'header' ? 'nav' : 'footer'}  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >
    function create_default_slot$n(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$n.name,
    		type: "slot",
    		source: "(21:0) <Box  {use}  bind:element  root={section === 'header' ? 'nav' : 'footer'}  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{ use: /*use*/ ctx[1] },
    		{
    			root: /*section*/ ctx[4] === 'header' ? 'nav' : 'footer'
    		},
    		{
    			class: /*cx*/ ctx[7](/*className*/ ctx[2], /*classes*/ ctx[6].root, /*getStyles*/ ctx[5]({ css: /*override*/ ctx[3] }))
    		},
    		/*$$restProps*/ ctx[8]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[14](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$n] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*use, section, cx, className, classes, getStyles, override, $$restProps*/ 510)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*section*/ 16 && {
    						root: /*section*/ ctx[4] === 'header' ? 'nav' : 'footer'
    					},
    					dirty & /*cx, className, classes, getStyles, override*/ 236 && {
    						class: /*cx*/ ctx[7](/*className*/ ctx[2], /*classes*/ ctx[6].root, /*getStyles*/ ctx[5]({ css: /*override*/ ctx[3] }))
    					},
    					dirty & /*$$restProps*/ 256 && get_spread_object(/*$$restProps*/ ctx[8])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 32768) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;

    	const omit_props_names = [
    		"use","element","class","override","height","fixed","position","zIndex","section"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('VerticalSection', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, height = undefined, fixed = false, position = {}, zIndex = 100, section } = $$props;

    	const injectStyles = globalCss({
    		':root': {
    			[`--svelteui-${section}-height`]: `${height}px`
    		}
    	});

    	injectStyles();

    	$$self.$$.on_mount.push(function () {
    		if (section === undefined && !('section' in $$props || $$self.$$.bound[$$self.$$.props['section']])) {
    			console.warn("<VerticalSection> was created without expected prop 'section'");
    		}
    	});

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('height' in $$new_props) $$invalidate(9, height = $$new_props.height);
    		if ('fixed' in $$new_props) $$invalidate(10, fixed = $$new_props.fixed);
    		if ('position' in $$new_props) $$invalidate(11, position = $$new_props.position);
    		if ('zIndex' in $$new_props) $$invalidate(12, zIndex = $$new_props.zIndex);
    		if ('section' in $$new_props) $$invalidate(4, section = $$new_props.section);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$d,
    		Box: Box$1,
    		globalCss,
    		use,
    		element,
    		className,
    		override,
    		height,
    		fixed,
    		position,
    		zIndex,
    		section,
    		injectStyles,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('height' in $$props) $$invalidate(9, height = $$new_props.height);
    		if ('fixed' in $$props) $$invalidate(10, fixed = $$new_props.fixed);
    		if ('position' in $$props) $$invalidate(11, position = $$new_props.position);
    		if ('zIndex' in $$props) $$invalidate(12, zIndex = $$new_props.zIndex);
    		if ('section' in $$props) $$invalidate(4, section = $$new_props.section);
    		if ('getStyles' in $$props) $$invalidate(5, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(6, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(7, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*section, fixed, height, position, zIndex*/ 7696) {
    			$$invalidate(
    				7,
    				{ cx, classes, getStyles } = useStyles$d(
    					{
    						borderPosition: section === 'header' ? 'bottom' : 'top',
    						fixed,
    						height,
    						position,
    						zIndex
    					},
    					{ name: 'VerticalSection' }
    				),
    				cx,
    				((((($$invalidate(6, classes), $$invalidate(4, section)), $$invalidate(10, fixed)), $$invalidate(9, height)), $$invalidate(11, position)), $$invalidate(12, zIndex)),
    				((((($$invalidate(5, getStyles), $$invalidate(4, section)), $$invalidate(10, fixed)), $$invalidate(9, height)), $$invalidate(11, position)), $$invalidate(12, zIndex))
    			);
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		section,
    		getStyles,
    		classes,
    		cx,
    		$$restProps,
    		height,
    		fixed,
    		position,
    		zIndex,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class VerticalSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$r, create_fragment$r, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			height: 9,
    			fixed: 10,
    			position: 11,
    			zIndex: 12,
    			section: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VerticalSection",
    			options,
    			id: create_fragment$r.name
    		});
    	}

    	get use() {
    		throw new Error("<VerticalSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<VerticalSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<VerticalSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<VerticalSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<VerticalSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<VerticalSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<VerticalSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<VerticalSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<VerticalSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<VerticalSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fixed() {
    		throw new Error("<VerticalSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fixed(value) {
    		throw new Error("<VerticalSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get position() {
    		throw new Error("<VerticalSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set position(value) {
    		throw new Error("<VerticalSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get zIndex() {
    		throw new Error("<VerticalSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set zIndex(value) {
    		throw new Error("<VerticalSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get section() {
    		throw new Error("<VerticalSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set section(value) {
    		throw new Error("<VerticalSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var VerticalSection$1 = VerticalSection;

    /* ../node_modules/@svelteuidev/core/dist/components/AppShell/Header/Header.svelte generated by Svelte v3.59.2 */

    // (6:0) <VerticalSection  bind:element  section="header"  class={className}  {use}  {override}  {height}  {fixed}  {position}  {zIndex}  {...$$restProps} >
    function create_default_slot$m(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$m.name,
    		type: "slot",
    		source: "(6:0) <VerticalSection  bind:element  section=\\\"header\\\"  class={className}  {use}  {override}  {height}  {fixed}  {position}  {zIndex}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let verticalsection;
    	let updating_element;
    	let current;

    	const verticalsection_spread_levels = [
    		{ section: "header" },
    		{ class: /*className*/ ctx[2] },
    		{ use: /*use*/ ctx[1] },
    		{ override: /*override*/ ctx[3] },
    		{ height: /*height*/ ctx[4] },
    		{ fixed: /*fixed*/ ctx[5] },
    		{ position: /*position*/ ctx[6] },
    		{ zIndex: /*zIndex*/ ctx[7] },
    		/*$$restProps*/ ctx[8]
    	];

    	function verticalsection_element_binding(value) {
    		/*verticalsection_element_binding*/ ctx[10](value);
    	}

    	let verticalsection_props = {
    		$$slots: { default: [create_default_slot$m] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < verticalsection_spread_levels.length; i += 1) {
    		verticalsection_props = assign(verticalsection_props, verticalsection_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		verticalsection_props.element = /*element*/ ctx[0];
    	}

    	verticalsection = new VerticalSection$1({
    			props: verticalsection_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(verticalsection, 'element', verticalsection_element_binding));

    	const block = {
    		c: function create() {
    			create_component(verticalsection.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(verticalsection, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const verticalsection_changes = (dirty & /*className, use, override, height, fixed, position, zIndex, $$restProps*/ 510)
    			? get_spread_update(verticalsection_spread_levels, [
    					verticalsection_spread_levels[0],
    					dirty & /*className*/ 4 && { class: /*className*/ ctx[2] },
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*override*/ 8 && { override: /*override*/ ctx[3] },
    					dirty & /*height*/ 16 && { height: /*height*/ ctx[4] },
    					dirty & /*fixed*/ 32 && { fixed: /*fixed*/ ctx[5] },
    					dirty & /*position*/ 64 && { position: /*position*/ ctx[6] },
    					dirty & /*zIndex*/ 128 && { zIndex: /*zIndex*/ ctx[7] },
    					dirty & /*$$restProps*/ 256 && get_spread_object(/*$$restProps*/ ctx[8])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 2048) {
    				verticalsection_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				verticalsection_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			verticalsection.$set(verticalsection_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(verticalsection.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(verticalsection.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(verticalsection, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	const omit_props_names = ["use","element","class","override","height","fixed","position","zIndex"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, height = undefined, fixed = false, position = { top: 0, left: 0, right: 0 }, zIndex = 100 } = $$props;

    	function verticalsection_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('height' in $$new_props) $$invalidate(4, height = $$new_props.height);
    		if ('fixed' in $$new_props) $$invalidate(5, fixed = $$new_props.fixed);
    		if ('position' in $$new_props) $$invalidate(6, position = $$new_props.position);
    		if ('zIndex' in $$new_props) $$invalidate(7, zIndex = $$new_props.zIndex);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		VerticalSection: VerticalSection$1,
    		use,
    		element,
    		className,
    		override,
    		height,
    		fixed,
    		position,
    		zIndex
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('height' in $$props) $$invalidate(4, height = $$new_props.height);
    		if ('fixed' in $$props) $$invalidate(5, fixed = $$new_props.fixed);
    		if ('position' in $$props) $$invalidate(6, position = $$new_props.position);
    		if ('zIndex' in $$props) $$invalidate(7, zIndex = $$new_props.zIndex);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		element,
    		use,
    		className,
    		override,
    		height,
    		fixed,
    		position,
    		zIndex,
    		$$restProps,
    		slots,
    		verticalsection_element_binding,
    		$$scope
    	];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$q, create_fragment$q, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			height: 4,
    			fixed: 5,
    			position: 6,
    			zIndex: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$q.name
    		});
    	}

    	get use() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fixed() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fixed(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get position() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set position(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get zIndex() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set zIndex(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Header$1 = Header;

    const sizes$5 = {
        xs: {
            fontSize: 9,
            height: 16
        },
        sm: {
            fontSize: 10,
            height: 18
        },
        md: {
            fontSize: 11,
            height: 20
        },
        lg: {
            fontSize: 13,
            height: 26
        },
        xl: {
            fontSize: 16,
            height: 32
        }
    };
    const dotSizes = {
        xs: 4,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10
    };
    var useStyles$c = createStyles((theme, { fullWidth, radius, size, color, gradientDeg, gradientFrom, gradientTo }) => {
        const dotSize = theme.fn.size({ size, sizes: dotSizes });
        const lightColors = theme.fn.variant({ color, variant: 'light' });
        const filledColors = theme.fn.variant({ color, variant: 'filled' });
        const outlineColors = theme.fn.variant({ color, variant: 'outline' });
        const gradientColors = theme.fn.variant({
            variant: 'gradient',
            gradient: { from: gradientFrom, to: gradientTo, deg: gradientDeg }
        });
        const { fontSize, height } = size in sizes$5 ? sizes$5[size] : sizes$5.md;
        return {
            root: {
                focusRing: 'auto',
                fontSize,
                height,
                WebkitTapHighlightColor: 'transparent',
                lineHeight: `${height - 2}px`,
                textDecoration: 'none',
                padding: `0 ${theme.fn.size({ size, sizes: theme.space }) / 1.5}px`,
                boxSizing: 'border-box',
                display: fullWidth ? 'flex' : 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: fullWidth ? '100%' : 'auto',
                textTransform: 'uppercase',
                borderRadius: theme.fn.radius(radius),
                fontFamily: theme.fonts.standard.value ?? 'sans-serif',
                fontWeight: 700,
                letterSpacing: 0.25,
                cursor: 'default',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                // As of now the createStyles function has a limitation that doesn't allow you to have multiple properties per component.
                // For an example, I can not make a `root` key, and then a `wrapper` key, and expect it to work. So for now they will be done manually.
                '&.light': {
                    [`${theme.dark} &`]: {
                        backgroundColor: lightColors.background[0],
                        color: lightColors.color[0]
                    },
                    backgroundColor: lightColors.background[1],
                    color: lightColors.color[1],
                    border: '1px solid transparent'
                },
                '&.filled': {
                    [`${theme.dark} &`]: {
                        backgroundColor: filledColors.background[0]
                    },
                    backgroundColor: filledColors.background[1],
                    color: filledColors.color,
                    border: '1px solid transparent'
                },
                '&.outline': {
                    [`${theme.dark} &`]: {
                        color: outlineColors.color[0],
                        border: `1px solid ${outlineColors.border[0]}`
                    },
                    backgroundColor: outlineColors.background,
                    color: outlineColors.color[1],
                    border: `1px solid ${outlineColors.border[1]}`
                },
                '&.gradient': {
                    backgroundImage: gradientColors.background,
                    color: gradientColors.color,
                    border: 0
                },
                '&.dot': {
                    darkMode: {
                        color: theme.fn.themeColor('dark', 0),
                        border: `1px solid ${theme.fn.themeColor('dark', 3)}`,
                        '&::before': {
                            backgroundColor: theme.fn.themeColor(color, 4)
                        }
                    },
                    backgroundColor: 'transparent',
                    color: theme.fn.themeColor('gray', 7),
                    border: `1px solid ${theme.fn.themeColor('gray', 3)}`,
                    paddingLeft: theme.fn.size({ size, sizes: theme.space }) / 1.5 - dotSize / 2,
                    '&::before': {
                        content: '""',
                        display: 'block',
                        width: dotSize,
                        height: dotSize,
                        borderRadius: dotSize,
                        backgroundColor: theme.fn.themeColor(color, 6),
                        marginRight: dotSize
                    }
                }
            },
            leftSection: {
                marginRight: parseInt(theme.space.xs.value) / 2
            },
            rightSection: {
                marginLeft: parseInt(theme.space.xs.value) / 2
            },
            inner: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/Badge/Badge.svelte generated by Svelte v3.59.2 */
    const file$e = "../node_modules/@svelteuidev/core/dist/components/Badge/Badge.svelte";
    const get_rightSection_slot_changes$2 = dirty => ({});
    const get_rightSection_slot_context$2 = ctx => ({});
    const get_leftSection_slot_changes = dirty => ({});
    const get_leftSection_slot_context = ctx => ({});

    // (42:1) {#if $$slots.leftSection}
    function create_if_block_1$7(ctx) {
    	let span;
    	let span_class_value;
    	let current;
    	const leftSection_slot_template = /*#slots*/ ctx[15].leftSection;
    	const leftSection_slot = create_slot(leftSection_slot_template, ctx, /*$$scope*/ ctx[17], get_leftSection_slot_context);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (leftSection_slot) leftSection_slot.c();
    			attr_dev(span, "class", span_class_value = /*classes*/ ctx[4].leftSection);
    			add_location(span, file$e, 42, 2, 1336);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (leftSection_slot) {
    				leftSection_slot.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (leftSection_slot) {
    				if (leftSection_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						leftSection_slot,
    						leftSection_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(leftSection_slot_template, /*$$scope*/ ctx[17], dirty, get_leftSection_slot_changes),
    						get_leftSection_slot_context
    					);
    				}
    			}

    			if (!current || dirty & /*classes*/ 16 && span_class_value !== (span_class_value = /*classes*/ ctx[4].leftSection)) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftSection_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftSection_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (leftSection_slot) leftSection_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$7.name,
    		type: "if",
    		source: "(42:1) {#if $$slots.leftSection}",
    		ctx
    	});

    	return block;
    }

    // (48:1) {#if $$slots.rightSection}
    function create_if_block$e(ctx) {
    	let span;
    	let span_class_value;
    	let current;
    	const rightSection_slot_template = /*#slots*/ ctx[15].rightSection;
    	const rightSection_slot = create_slot(rightSection_slot_template, ctx, /*$$scope*/ ctx[17], get_rightSection_slot_context$2);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (rightSection_slot) rightSection_slot.c();
    			attr_dev(span, "class", span_class_value = /*classes*/ ctx[4].rightSection);
    			add_location(span, file$e, 48, 2, 1494);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (rightSection_slot) {
    				rightSection_slot.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (rightSection_slot) {
    				if (rightSection_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						rightSection_slot,
    						rightSection_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(rightSection_slot_template, /*$$scope*/ ctx[17], dirty, get_rightSection_slot_changes$2),
    						get_rightSection_slot_context$2
    					);
    				}
    			}

    			if (!current || dirty & /*classes*/ 16 && span_class_value !== (span_class_value = /*classes*/ ctx[4].rightSection)) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rightSection_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rightSection_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (rightSection_slot) rightSection_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$e.name,
    		type: "if",
    		source: "(48:1) {#if $$slots.rightSection}",
    		ctx
    	});

    	return block;
    }

    // (36:0) <Box  use={[forwardEvents, [useActions, use]]}  bind:element  class={cx(className, variant, classes.root)}  {...$$restProps} >
    function create_default_slot$l(ctx) {
    	let t0;
    	let span;
    	let span_class_value;
    	let t1;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = /*$$slots*/ ctx[8].leftSection && create_if_block_1$7(ctx);
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);
    	let if_block1 = /*$$slots*/ ctx[8].rightSection && create_if_block$e(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			span = element("span");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			attr_dev(span, "class", span_class_value = /*classes*/ ctx[4].inner);
    			add_location(span, file$e, 46, 1, 1420);
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*$$slots*/ ctx[8].leftSection) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*$$slots*/ 256) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$7(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*classes*/ 16 && span_class_value !== (span_class_value = /*classes*/ ctx[4].inner)) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (/*$$slots*/ ctx[8].rightSection) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*$$slots*/ 256) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$e(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(default_slot, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(default_slot, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$l.name,
    		type: "slot",
    		source: "(36:0) <Box  use={[forwardEvents, [useActions, use]]}  bind:element  class={cx(className, variant, classes.root)}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{
    			use: [/*forwardEvents*/ ctx[6], [useActions, /*use*/ ctx[1]]]
    		},
    		{
    			class: /*cx*/ ctx[5](/*className*/ ctx[2], /*variant*/ ctx[3], /*classes*/ ctx[4].root)
    		},
    		/*$$restProps*/ ctx[7]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[16](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$l] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*forwardEvents, useActions, use, cx, className, variant, classes, $$restProps*/ 254)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*forwardEvents, useActions, use*/ 66 && {
    						use: [/*forwardEvents*/ ctx[6], [useActions, /*use*/ ctx[1]]]
    					},
    					dirty & /*cx, className, variant, classes*/ 60 && {
    						class: /*cx*/ ctx[5](/*className*/ ctx[2], /*variant*/ ctx[3], /*classes*/ ctx[4].root)
    					},
    					dirty & /*$$restProps*/ 128 && get_spread_object(/*$$restProps*/ ctx[7])
    				])
    			: {};

    			if (dirty & /*$$scope, classes, $$slots*/ 131344) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;

    	const omit_props_names = [
    		"use","element","class","override","color","variant","gradient","size","radius","fullWidth"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Badge', slots, ['leftSection','default','rightSection']);
    	const $$slots = compute_slots(slots);
    	let { use = [], element = undefined, class: className = '', override = {}, color = 'blue', variant = 'light', gradient = { from: 'blue', to: 'cyan', deg: 45 }, size = 'md', radius = 'xl', fullWidth = false } = $$props;

    	/** An action that forwards inner dom node events from parent component */
    	const forwardEvents = createEventForwarder(get_current_component());

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(9, override = $$new_props.override);
    		if ('color' in $$new_props) $$invalidate(10, color = $$new_props.color);
    		if ('variant' in $$new_props) $$invalidate(3, variant = $$new_props.variant);
    		if ('gradient' in $$new_props) $$invalidate(11, gradient = $$new_props.gradient);
    		if ('size' in $$new_props) $$invalidate(12, size = $$new_props.size);
    		if ('radius' in $$new_props) $$invalidate(13, radius = $$new_props.radius);
    		if ('fullWidth' in $$new_props) $$invalidate(14, fullWidth = $$new_props.fullWidth);
    		if ('$$scope' in $$new_props) $$invalidate(17, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$c,
    		createEventForwarder,
    		useActions,
    		get_current_component,
    		Box: Box$1,
    		use,
    		element,
    		className,
    		override,
    		color,
    		variant,
    		gradient,
    		size,
    		radius,
    		fullWidth,
    		forwardEvents,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(9, override = $$new_props.override);
    		if ('color' in $$props) $$invalidate(10, color = $$new_props.color);
    		if ('variant' in $$props) $$invalidate(3, variant = $$new_props.variant);
    		if ('gradient' in $$props) $$invalidate(11, gradient = $$new_props.gradient);
    		if ('size' in $$props) $$invalidate(12, size = $$new_props.size);
    		if ('radius' in $$props) $$invalidate(13, radius = $$new_props.radius);
    		if ('fullWidth' in $$props) $$invalidate(14, fullWidth = $$new_props.fullWidth);
    		if ('classes' in $$props) $$invalidate(4, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(5, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*color, fullWidth, size, radius, gradient, override*/ 32256) {
    			$$invalidate(
    				5,
    				{ cx, classes } = useStyles$c(
    					{
    						color,
    						fullWidth,
    						size,
    						radius,
    						gradientDeg: gradient.deg,
    						gradientFrom: gradient.from,
    						gradientTo: gradient.to
    					},
    					{ override, name: 'Badge' }
    				),
    				cx,
    				(((((($$invalidate(4, classes), $$invalidate(10, color)), $$invalidate(14, fullWidth)), $$invalidate(12, size)), $$invalidate(13, radius)), $$invalidate(11, gradient)), $$invalidate(9, override))
    			);
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		variant,
    		classes,
    		cx,
    		forwardEvents,
    		$$restProps,
    		$$slots,
    		override,
    		color,
    		gradient,
    		size,
    		radius,
    		fullWidth,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class Badge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$p, create_fragment$p, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 9,
    			color: 10,
    			variant: 3,
    			gradient: 11,
    			size: 12,
    			radius: 13,
    			fullWidth: 14
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Badge",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get use() {
    		throw new Error("<Badge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Badge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Badge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Badge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Badge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Badge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Badge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Badge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Badge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Badge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error("<Badge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<Badge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gradient() {
    		throw new Error("<Badge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gradient(value) {
    		throw new Error("<Badge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Badge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Badge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radius() {
    		throw new Error("<Badge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radius(value) {
    		throw new Error("<Badge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullWidth() {
    		throw new Error("<Badge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullWidth(value) {
    		throw new Error("<Badge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Badge$1 = Badge;

    var useStyles$b = createStyles((theme) => {
        return {
            root: {
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: theme.colors.white.value
            }
        };
    });

    var useStyles$a = createStyles((theme, { radius, shadow, withBorder, padding }) => {
        return {
            root: {
                darkMode: {
                    backgroundColor: theme.fn.themeColor('dark', 7),
                    color: theme.fn.themeColor('dark')
                },
                padding: theme.fn.size({ size: padding, sizes: theme.space }),
                outline: 0,
                display: 'block',
                textDecoration: 'none',
                color: theme.colors.black.value,
                backgroundColor: theme.colors.white.value,
                boxSizing: 'border-box',
                borderRadius: `$${radius}`,
                WebkitTapHighlightColor: 'transparent',
                boxShadow: theme.shadows[shadow].value || shadow || 'none',
                border: undefined
            },
            withBorder: {
                darkMode: {
                    border: `1px solid ${theme.fn.themeColor('dark', 4)}`
                },
                border: `1px solid ${theme.fn.themeColor('gray', 3)}`
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/Paper/Paper.svelte generated by Svelte v3.59.2 */

    // (8:0) <Box  bind:element  class={cx(   classes.root,   className,   withBorder && classes.withBorder,   getStyles({ css: override })  )}  {use}  {...$$restProps} >
    function create_default_slot$k(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$k.name,
    		type: "slot",
    		source: "(8:0) <Box  bind:element  class={cx(   classes.root,   className,   withBorder && classes.withBorder,   getStyles({ css: override })  )}  {use}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{
    			class: /*cx*/ ctx[7](/*classes*/ ctx[6].root, /*className*/ ctx[2], /*withBorder*/ ctx[4] && /*classes*/ ctx[6].withBorder, /*getStyles*/ ctx[5]({ css: /*override*/ ctx[3] }))
    		},
    		{ use: /*use*/ ctx[1] },
    		/*$$restProps*/ ctx[8]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[13](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$k] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*cx, classes, className, withBorder, getStyles, override, use, $$restProps*/ 510)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*cx, classes, className, withBorder, getStyles, override*/ 252 && {
    						class: /*cx*/ ctx[7](/*classes*/ ctx[6].root, /*className*/ ctx[2], /*withBorder*/ ctx[4] && /*classes*/ ctx[6].withBorder, /*getStyles*/ ctx[5]({ css: /*override*/ ctx[3] }))
    					},
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*$$restProps*/ 256 && get_spread_object(/*$$restProps*/ ctx[8])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 16384) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;
    	const omit_props_names = ["use","element","class","override","shadow","radius","withBorder","padding"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Paper', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, shadow = 'xs', radius = 'sm', withBorder = false, padding = 'md' } = $$props;

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('shadow' in $$new_props) $$invalidate(9, shadow = $$new_props.shadow);
    		if ('radius' in $$new_props) $$invalidate(10, radius = $$new_props.radius);
    		if ('withBorder' in $$new_props) $$invalidate(4, withBorder = $$new_props.withBorder);
    		if ('padding' in $$new_props) $$invalidate(11, padding = $$new_props.padding);
    		if ('$$scope' in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$a,
    		Box: Box$1,
    		use,
    		element,
    		className,
    		override,
    		shadow,
    		radius,
    		withBorder,
    		padding,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('shadow' in $$props) $$invalidate(9, shadow = $$new_props.shadow);
    		if ('radius' in $$props) $$invalidate(10, radius = $$new_props.radius);
    		if ('withBorder' in $$props) $$invalidate(4, withBorder = $$new_props.withBorder);
    		if ('padding' in $$props) $$invalidate(11, padding = $$new_props.padding);
    		if ('getStyles' in $$props) $$invalidate(5, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(6, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(7, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*radius, shadow, withBorder, padding*/ 3600) {
    			$$invalidate(7, { cx, classes, getStyles } = useStyles$a({ radius, shadow, withBorder, padding }, { name: 'Paper' }), cx, (((($$invalidate(6, classes), $$invalidate(10, radius)), $$invalidate(9, shadow)), $$invalidate(4, withBorder)), $$invalidate(11, padding)), (((($$invalidate(5, getStyles), $$invalidate(10, radius)), $$invalidate(9, shadow)), $$invalidate(4, withBorder)), $$invalidate(11, padding)));
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		withBorder,
    		getStyles,
    		classes,
    		cx,
    		$$restProps,
    		shadow,
    		radius,
    		padding,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class Paper extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			shadow: 9,
    			radius: 10,
    			withBorder: 4,
    			padding: 11
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Paper",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get use() {
    		throw new Error("<Paper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Paper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Paper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Paper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Paper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Paper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Paper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Paper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shadow() {
    		throw new Error("<Paper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set shadow(value) {
    		throw new Error("<Paper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radius() {
    		throw new Error("<Paper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radius(value) {
    		throw new Error("<Paper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get withBorder() {
    		throw new Error("<Paper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set withBorder(value) {
    		throw new Error("<Paper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get padding() {
    		throw new Error("<Paper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set padding(value) {
    		throw new Error("<Paper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Paper$1 = Paper;

    /* ../node_modules/@svelteuidev/core/dist/components/Card/Card.svelte generated by Svelte v3.59.2 */

    // (22:0) <Paper  bind:element  class={cx(className, classes.root)}  override={{   [`${theme.dark} &`]: {    backgroundColor: theme.fn.themeColor('dark', 6)   },   ...override  }}  {padding}  {use}  {...$$restProps} >
    function create_default_slot$j(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$j.name,
    		type: "slot",
    		source: "(22:0) <Paper  bind:element  class={cx(className, classes.root)}  override={{   [`${theme.dark} &`]: {    backgroundColor: theme.fn.themeColor('dark', 6)   },   ...override  }}  {padding}  {use}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$n(ctx) {
    	let paper;
    	let updating_element;
    	let current;

    	const paper_spread_levels = [
    		{
    			class: /*cx*/ ctx[7](/*className*/ ctx[2], /*classes*/ ctx[6].root)
    		},
    		{
    			override: {
    				[`${/*theme*/ ctx[5].dark} &`]: {
    					backgroundColor: /*theme*/ ctx[5].fn.themeColor('dark', 6)
    				},
    				.../*override*/ ctx[3]
    			}
    		},
    		{ padding: /*padding*/ ctx[4] },
    		{ use: /*use*/ ctx[1] },
    		/*$$restProps*/ ctx[8]
    	];

    	function paper_element_binding(value) {
    		/*paper_element_binding*/ ctx[10](value);
    	}

    	let paper_props = {
    		$$slots: { default: [create_default_slot$j] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < paper_spread_levels.length; i += 1) {
    		paper_props = assign(paper_props, paper_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		paper_props.element = /*element*/ ctx[0];
    	}

    	paper = new Paper$1({ props: paper_props, $$inline: true });
    	binding_callbacks.push(() => bind(paper, 'element', paper_element_binding));

    	const block = {
    		c: function create() {
    			create_component(paper.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(paper, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const paper_changes = (dirty & /*cx, className, classes, theme, override, padding, use, $$restProps*/ 510)
    			? get_spread_update(paper_spread_levels, [
    					dirty & /*cx, className, classes*/ 196 && {
    						class: /*cx*/ ctx[7](/*className*/ ctx[2], /*classes*/ ctx[6].root)
    					},
    					dirty & /*theme, override*/ 40 && {
    						override: {
    							[`${/*theme*/ ctx[5].dark} &`]: {
    								backgroundColor: /*theme*/ ctx[5].fn.themeColor('dark', 6)
    							},
    							.../*override*/ ctx[3]
    						}
    					},
    					dirty & /*padding*/ 16 && { padding: /*padding*/ ctx[4] },
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*$$restProps*/ 256 && get_spread_object(/*$$restProps*/ ctx[8])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 2048) {
    				paper_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				paper_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			paper.$set(paper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paper, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let theme;
    	const omit_props_names = ["use","element","class","override","padding"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Card', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, padding = 'md' } = $$props;

    	/** can only get access to children at runtime */
    	onMount(() => {
    		const nodeLength = element.children.length;
    		const firstChild = element.children[0];
    		const lastChild = element.children[nodeLength - 1];

    		if (firstChild?.id === 'svelteui_card_section') {
    			firstChild.style.marginTop = `${-1 * theme.fn.size({ size: padding, sizes: theme.space })}px`;
    		}

    		if (lastChild?.id === 'svelteui_card_section') {
    			// prettier-ignore
    			lastChild.style.marginBottom = `${-1 * theme.fn.size({ size: padding, sizes: theme.space })}px`;
    		}
    	});

    	function paper_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('padding' in $$new_props) $$invalidate(4, padding = $$new_props.padding);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$b,
    		Paper: Paper$1,
    		onMount,
    		use,
    		element,
    		className,
    		override,
    		padding,
    		theme,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('padding' in $$props) $$invalidate(4, padding = $$new_props.padding);
    		if ('theme' in $$props) $$invalidate(5, theme = $$new_props.theme);
    		if ('classes' in $$props) $$invalidate(6, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(7, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(7, { cx, classes, theme } = useStyles$b(null, { name: 'Card' }), cx, $$invalidate(6, classes), $$invalidate(5, theme));

    	return [
    		element,
    		use,
    		className,
    		override,
    		padding,
    		theme,
    		classes,
    		cx,
    		$$restProps,
    		slots,
    		paper_element_binding,
    		$$scope
    	];
    }

    let Card$1 = class Card extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$n, create_fragment$n, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			padding: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Card",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get use() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get padding() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set padding(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    };

    var _Card = Card$1;

    var useStyles$9 = createStyles((theme, { padding }) => {
        return {
            root: {
                display: 'block',
                marginLeft: -1 * theme.fn.size({ size: padding, sizes: theme.space }),
                marginRight: -1 * theme.fn.size({ size: padding, sizes: theme.space })
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/Card/CardSection/CardSection.svelte generated by Svelte v3.59.2 */

    // (8:0) <Box  id="svelteui_card_section"  bind:element  class={cx(className, classes.root, getStyles({ css: override }))}  {use}  {...$$restProps} >
    function create_default_slot$i(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$i.name,
    		type: "slot",
    		source: "(8:0) <Box  id=\\\"svelteui_card_section\\\"  bind:element  class={cx(className, classes.root, getStyles({ css: override }))}  {use}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{ id: "svelteui_card_section" },
    		{
    			class: /*cx*/ ctx[6](/*className*/ ctx[2], /*classes*/ ctx[5].root, /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
    		},
    		{ use: /*use*/ ctx[1] },
    		/*$$restProps*/ ctx[7]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[10](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$i] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*cx, className, classes, getStyles, override, use, $$restProps*/ 254)
    			? get_spread_update(box_spread_levels, [
    					box_spread_levels[0],
    					dirty & /*cx, className, classes, getStyles, override*/ 124 && {
    						class: /*cx*/ ctx[6](/*className*/ ctx[2], /*classes*/ ctx[5].root, /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
    					},
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*$$restProps*/ 128 && get_spread_object(/*$$restProps*/ ctx[7])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 2048) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;
    	const omit_props_names = ["use","element","class","override","padding"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardSection', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, padding = 'md' } = $$props;

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('padding' in $$new_props) $$invalidate(8, padding = $$new_props.padding);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$9,
    		Box: Box$1,
    		use,
    		element,
    		className,
    		override,
    		padding,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('padding' in $$props) $$invalidate(8, padding = $$new_props.padding);
    		if ('getStyles' in $$props) $$invalidate(4, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(5, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(6, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*padding*/ 256) {
    			$$invalidate(6, { cx, classes, getStyles } = useStyles$9({ padding }), cx, ($$invalidate(5, classes), $$invalidate(8, padding)), ($$invalidate(4, getStyles), $$invalidate(8, padding)));
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		getStyles,
    		classes,
    		cx,
    		$$restProps,
    		padding,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class CardSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$m, create_fragment$m, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			padding: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardSection",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get use() {
    		throw new Error("<CardSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<CardSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<CardSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<CardSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<CardSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<CardSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<CardSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<CardSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get padding() {
    		throw new Error("<CardSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set padding(value) {
    		throw new Error("<CardSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Section = CardSection;

    // Combine Card and Section
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _Card.Section = Section;
    const Card = _Card;

    const sizes$4 = {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 30,
        xl: 36
    };
    const iconSizes = {
        xs: 8,
        sm: 10,
        md: 14,
        lg: 16,
        xl: 20
    };
    var useStyles$8 = createStyles((theme, { color, radius, size, transitionDuration }, getRef) => {
        return {
            root: {
                display: 'flex',
                alignItems: 'center'
            },
            inner: {
                position: 'relative',
                width: sizes$4[size],
                height: sizes$4[size]
            },
            label: {
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                paddingLeft: theme.fn.size({ size, sizes: theme.space }),
                fontSize: `$${size}`,
                lineHeight: `$${size}`,
                color: '#000000',
                fontFamily: theme.fonts.standard.value ?? 'sans-serif',
                darkMode: {
                    color: '$dark000'
                }
            },
            input: {
                cursor: 'pointer',
                appearance: 'none',
                backgroundColor: '#ffffff',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '$gray400',
                width: sizes$4[size],
                height: sizes$4[size],
                borderRadius: `$${radius}`,
                padding: 0,
                display: 'block',
                margin: 0,
                transition: `border-color ${transitionDuration}ms ease, background-color ${transitionDuration}ms ease`,
                darkMode: {
                    '&:not(:checked)': {
                        backgroundColor: '$dark400',
                        borderColor: '$dark400'
                    }
                },
                '&:checked': {
                    border: 'transparent',
                    backgroundColor: theme.fn.themeColor(color, 6),
                    color: '#ffffff',
                    borderRadius: `$${radius}`,
                    [`& + .${getRef('iconWrapper')}`]: {
                        opacity: 1,
                        transform: 'translateY(0) scale(1)'
                    }
                },
                '&:disabled': {
                    backgroundColor: '$gray200',
                    borderColor: '$gray300',
                    cursor: 'not-allowed',
                    [`& + .${getRef('iconWrapper')}`]: {
                        color: '$gray500',
                        backgroundColor: '$gray200',
                        borderColor: '$gray300'
                    },
                    darkMode: {
                        backgroundColor: '$dark400',
                        borderColor: '$dark600',
                        [`& + .${getRef('icon')}`]: {
                            color: '$dark600'
                        }
                    }
                }
            },
            iconWrapper: {
                ref: getRef('iconWrapper'),
                color: '#ffffff',
                transform: 'translateY(5px) scale(0.5)',
                opacity: 0,
                transitionProperty: 'opacity, transform',
                transitionTimingFunction: 'ease',
                transitionDuration: `${transitionDuration}ms`,
                pointerEvents: 'none',
                width: sizes$4[size],
                height: sizes$4[size],
                minWidth: sizes$4[size],
                minHeight: sizes$4[size],
                borderRadius: `$${radius}`,
                position: 'absolute',
                zIndex: 1,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: 'auto',
                '@media (prefers-reduced-motion)': {
                    transitionDuration: '0ms'
                }
            },
            icon: {
                ref: getRef('icon'),
                color: '#ffffff',
                width: iconSizes[size],
                height: iconSizes[size],
                minWidth: iconSizes[size],
                minHeight: iconSizes[size],
                '@media (prefers-reduced-motion)': {
                    transitionDuration: '0ms'
                }
            }
        };
    });

    const { rgba } = fns;
    const sizes$3 = {
        xs: 16,
        sm: 20,
        md: 26,
        lg: 32,
        xl: 40
    };
    function getVariantStyles(color, variant, gradient) {
        const ctx = { from: 'blue', to: 'cyan', deg: 45 };
        if (variant === 'gradient')
            return getVariant(color, gradient);
        return getVariant(color, ctx);
    }
    /**
     * getVariant function is a copy & paste of the vFunc function
     *
     * It is copied over because hover styles were removed
     *
     * Better implementation should be developed soon
     */
    const getVariant = (color, gradient) => {
        const dtm = {
            lightBg: dark.colors[`${color}800`].value,
            lightHv: dark.colors[`${color}700`].value,
            outlineHv: dark.colors[`${color}400`].value,
            subtleHv: dark.colors[`${color}800`].value
        };
        return {
            /** Filled variant */
            filled: {
                [`${dark.selector} &`]: {
                    backgroundColor: `$${color}800`
                },
                border: 'transparent',
                backgroundColor: `$${color}600`,
                color: 'White'
            },
            /** Light variant */
            light: {
                [`${dark.selector} &`]: {
                    backgroundColor: rgba(dtm.lightBg, 0.35),
                    color: color === 'dark' ? '$dark50' : `$${color}200`
                },
                border: 'transparent',
                backgroundColor: `$${color}50`,
                color: color === 'dark' ? '$dark900' : `$${color}600`
            },
            /** Outline variant */
            outline: {
                [`${dark.selector} &`]: {
                    border: `1px solid $${color}400`,
                    color: `$${color}400`
                },
                border: `1px solid $${color}700`,
                backgroundColor: 'transparent',
                color: `$${color}700`
            },
            /** Subtle variant */
            subtle: {
                [`${dark.selector} &`]: {
                    color: color === 'dark' ? '$dark50' : `$${color}200`
                },
                border: 'transparent',
                backgroundColor: 'transparent',
                color: color === 'dark' ? '$dark900' : `$${color}600`
            },
            /** Default variant */
            default: {
                [`${dark.selector} &`]: {
                    border: '1px solid $dark500',
                    backgroundColor: '$dark500',
                    color: 'White'
                },
                border: '1px solid $gray400',
                backgroundColor: 'White',
                color: 'Black'
            },
            /** White variant */
            white: {
                border: 'transparent',
                backgroundColor: 'White',
                color: `$${color}700`
            },
            /** Gradient variant */
            gradient: {
                border: 'transparent',
                background: `linear-gradient(${gradient.deg}deg, $${gradient.from}600 0%, $${gradient.to}600 100%)`,
                color: 'White'
            }
        };
    };
    var useStyles$7 = createStyles((_, { color, gradient, iconSize, radius, variant }) => {
        return {
            root: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                width: iconSize,
                height: iconSize,
                minWidth: iconSize,
                minHeight: iconSize,
                borderRadius: `$${radius}`,
                variants: {
                    variation: getVariantStyles(color, variant, gradient)
                }
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/ThemeIcon/ThemeIcon.svelte generated by Svelte v3.59.2 */

    // (28:0) <Box  bind:element  {use}  class={cx(className, classes.root, getStyles({ css: override, variation: variant }))}  {...$$restProps} >
    function create_default_slot$h(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[14].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[16], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 65536)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[16],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[16])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[16], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$h.name,
    		type: "slot",
    		source: "(28:0) <Box  bind:element  {use}  class={cx(className, classes.root, getStyles({ css: override, variation: variant }))}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{ use: /*use*/ ctx[1] },
    		{
    			class: /*cx*/ ctx[7](/*className*/ ctx[2], /*classes*/ ctx[6].root, /*getStyles*/ ctx[5]({
    				css: /*override*/ ctx[3],
    				variation: /*variant*/ ctx[4]
    			}))
    		},
    		/*$$restProps*/ ctx[8]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[15](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$h] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*use, cx, className, classes, getStyles, override, variant, $$restProps*/ 510)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*cx, className, classes, getStyles, override, variant*/ 252 && {
    						class: /*cx*/ ctx[7](/*className*/ ctx[2], /*classes*/ ctx[6].root, /*getStyles*/ ctx[5]({
    							css: /*override*/ ctx[3],
    							variation: /*variant*/ ctx[4]
    						}))
    					},
    					dirty & /*$$restProps*/ 256 && get_spread_object(/*$$restProps*/ ctx[8])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 65536) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let iconSize;
    	let cx;
    	let classes;
    	let getStyles;

    	const omit_props_names = [
    		"use","element","class","override","size","radius","color","variant","gradient"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ThemeIcon', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, size = 'md', radius = 'sm', color = 'blue', variant = 'filled', gradient = { from: 'blue', to: 'cyan', deg: 45 } } = $$props;

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('size' in $$new_props) $$invalidate(9, size = $$new_props.size);
    		if ('radius' in $$new_props) $$invalidate(10, radius = $$new_props.radius);
    		if ('color' in $$new_props) $$invalidate(11, color = $$new_props.color);
    		if ('variant' in $$new_props) $$invalidate(4, variant = $$new_props.variant);
    		if ('gradient' in $$new_props) $$invalidate(12, gradient = $$new_props.gradient);
    		if ('$$scope' in $$new_props) $$invalidate(16, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Box: Box$1,
    		useStyles: useStyles$7,
    		sizes: sizes$3,
    		use,
    		element,
    		className,
    		override,
    		size,
    		radius,
    		color,
    		variant,
    		gradient,
    		iconSize,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('size' in $$props) $$invalidate(9, size = $$new_props.size);
    		if ('radius' in $$props) $$invalidate(10, radius = $$new_props.radius);
    		if ('color' in $$props) $$invalidate(11, color = $$new_props.color);
    		if ('variant' in $$props) $$invalidate(4, variant = $$new_props.variant);
    		if ('gradient' in $$props) $$invalidate(12, gradient = $$new_props.gradient);
    		if ('iconSize' in $$props) $$invalidate(13, iconSize = $$new_props.iconSize);
    		if ('getStyles' in $$props) $$invalidate(5, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(6, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(7, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*size*/ 512) {
    			$$invalidate(13, iconSize = typeof size === 'number'
    			? `${size}px`
    			: sizes$3[size] ?? sizes$3.md);
    		}

    		if ($$self.$$.dirty & /*color, gradient, iconSize, radius, variant*/ 15376) {
    			$$invalidate(
    				7,
    				{ cx, classes, getStyles } = useStyles$7(
    					{
    						color,
    						gradient,
    						iconSize,
    						radius,
    						variant
    					},
    					{ name: 'ThemeIcon' }
    				),
    				cx,
    				(((((($$invalidate(6, classes), $$invalidate(11, color)), $$invalidate(12, gradient)), $$invalidate(13, iconSize)), $$invalidate(10, radius)), $$invalidate(4, variant)), $$invalidate(9, size)),
    				(((((($$invalidate(5, getStyles), $$invalidate(11, color)), $$invalidate(12, gradient)), $$invalidate(13, iconSize)), $$invalidate(10, radius)), $$invalidate(4, variant)), $$invalidate(9, size))
    			);
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		variant,
    		getStyles,
    		classes,
    		cx,
    		$$restProps,
    		size,
    		radius,
    		color,
    		gradient,
    		iconSize,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class ThemeIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			size: 9,
    			radius: 10,
    			color: 11,
    			variant: 4,
    			gradient: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ThemeIcon",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get use() {
    		throw new Error("<ThemeIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<ThemeIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<ThemeIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<ThemeIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<ThemeIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ThemeIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<ThemeIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<ThemeIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<ThemeIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ThemeIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radius() {
    		throw new Error("<ThemeIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radius(value) {
    		throw new Error("<ThemeIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<ThemeIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<ThemeIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error("<ThemeIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<ThemeIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gradient() {
    		throw new Error("<ThemeIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gradient(value) {
    		throw new Error("<ThemeIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ThemeIcon$1 = ThemeIcon;

    /* ../node_modules/@svelteuidev/core/dist/components/Checkbox/CheckboxIcon.svelte generated by Svelte v3.59.2 */

    const file$d = "../node_modules/@svelteuidev/core/dist/components/Checkbox/CheckboxIcon.svelte";

    // (10:0) {:else}
    function create_else_block$7(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z");
    			attr_dev(path, "fill", "currentColor");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "clip-rule", "evenodd");
    			add_location(path, file$d, 11, 2, 391);
    			attr_dev(svg, "class", /*className*/ ctx[0]);
    			attr_dev(svg, "viewBox", "0 0 10 7");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$d, 10, 1, 299);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*className*/ 1) {
    				attr_dev(svg, "class", /*className*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$7.name,
    		type: "else",
    		source: "(10:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (6:0) {#if indeterminate}
    function create_if_block$d(ctx) {
    	let svg;
    	let rect;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			attr_dev(rect, "width", "32");
    			attr_dev(rect, "height", "6");
    			attr_dev(rect, "fill", "currentColor");
    			attr_dev(rect, "rx", "3");
    			add_location(rect, file$d, 7, 2, 224);
    			attr_dev(svg, "class", /*className*/ ctx[0]);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "viewBox", "0 0 32 6");
    			add_location(svg, file$d, 6, 1, 132);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, rect);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*className*/ 1) {
    				attr_dev(svg, "class", /*className*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$d.name,
    		type: "if",
    		source: "(6:0) {#if indeterminate}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*indeterminate*/ ctx[1]) return create_if_block$d;
    		return create_else_block$7;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CheckboxIcon', slots, []);
    	let { class: className = '' } = $$props;
    	let { indeterminate = false } = $$props;
    	const writable_props = ['class', 'indeterminate'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CheckboxIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, className = $$props.class);
    		if ('indeterminate' in $$props) $$invalidate(1, indeterminate = $$props.indeterminate);
    	};

    	$$self.$capture_state = () => ({ className, indeterminate });

    	$$self.$inject_state = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('indeterminate' in $$props) $$invalidate(1, indeterminate = $$props.indeterminate);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, indeterminate];
    }

    class CheckboxIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, { class: 0, indeterminate: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CheckboxIcon",
    			options,
    			id: create_fragment$k.name
    		});
    	}

    	get class() {
    		throw new Error("<CheckboxIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<CheckboxIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get indeterminate() {
    		throw new Error("<CheckboxIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set indeterminate(value) {
    		throw new Error("<CheckboxIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var CheckboxIcon$1 = CheckboxIcon;

    /* ../node_modules/@svelteuidev/core/dist/components/Checkbox/Checkbox.svelte generated by Svelte v3.59.2 */
    const file$c = "../node_modules/@svelteuidev/core/dist/components/Checkbox/Checkbox.svelte";

    // (51:9)      
    function fallback_block$2(ctx) {
    	let checkboxicon;
    	let current;

    	checkboxicon = new CheckboxIcon$1({
    			props: {
    				class: /*classes*/ ctx[14].icon,
    				indeterminate: /*indeterminate*/ ctx[8]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(checkboxicon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(checkboxicon, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const checkboxicon_changes = {};
    			if (dirty & /*classes*/ 16384) checkboxicon_changes.class = /*classes*/ ctx[14].icon;
    			if (dirty & /*indeterminate*/ 256) checkboxicon_changes.indeterminate = /*indeterminate*/ ctx[8];
    			checkboxicon.$set(checkboxicon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkboxicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(checkboxicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(checkboxicon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$2.name,
    		type: "fallback",
    		source: "(51:9)      ",
    		ctx
    	});

    	return block;
    }

    // (50:2) <ThemeIcon class={classes.iconWrapper} variant={null} {size}>
    function create_default_slot_1$9(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[21].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[24], null);
    	const default_slot_or_fallback = default_slot || fallback_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16777216)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[24],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[24])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[24], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*classes, indeterminate*/ 16640)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$9.name,
    		type: "slot",
    		source: "(50:2) <ThemeIcon class={classes.iconWrapper} variant={null} {size}>",
    		ctx
    	});

    	return block;
    }

    // (56:1) {#if label}
    function create_if_block$c(ctx) {
    	let label_1;
    	let t;
    	let label_1_class_value;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			t = text(/*label*/ ctx[9]);
    			attr_dev(label_1, "class", label_1_class_value = /*classes*/ ctx[14].label);
    			attr_dev(label_1, "for", /*id*/ ctx[5]);
    			add_location(label_1, file$c, 56, 2, 1813);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 512) set_data_dev(t, /*label*/ ctx[9]);

    			if (dirty & /*classes*/ 16384 && label_1_class_value !== (label_1_class_value = /*classes*/ ctx[14].label)) {
    				attr_dev(label_1, "class", label_1_class_value);
    			}

    			if (dirty & /*id*/ 32) {
    				attr_dev(label_1, "for", /*id*/ ctx[5]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$c.name,
    		type: "if",
    		source: "(56:1) {#if label}",
    		ctx
    	});

    	return block;
    }

    // (31:0) <Box  bind:element  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >
    function create_default_slot$g(ctx) {
    	let div;
    	let input;
    	let input_class_value;
    	let useActions_action;
    	let t0;
    	let themeicon;
    	let div_class_value;
    	let t1;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;

    	themeicon = new ThemeIcon$1({
    			props: {
    				class: /*classes*/ ctx[14].iconWrapper,
    				variant: null,
    				size: /*size*/ ctx[10],
    				$$slots: { default: [create_default_slot_1$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = /*label*/ ctx[9] && create_if_block$c(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t0 = space();
    			create_component(themeicon.$$.fragment);
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(input, "class", input_class_value = /*classes*/ ctx[14].input);
    			attr_dev(input, "type", "checkbox");
    			input.disabled = /*disabled*/ ctx[6];
    			input.required = /*required*/ ctx[12];
    			input.__value = /*value*/ ctx[7];
    			input.value = input.__value;
    			attr_dev(input, "id", /*id*/ ctx[5]);
    			attr_dev(input, "name", /*name*/ ctx[11]);
    			toggle_class(input, "disabled", /*disabled*/ ctx[6]);
    			add_location(input, file$c, 36, 2, 1440);
    			attr_dev(div, "class", div_class_value = /*classes*/ ctx[14].inner);
    			add_location(div, file$c, 35, 1, 1410);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			input.checked = /*checked*/ ctx[0];
    			append_dev(div, t0);
    			mount_component(themeicon, div, null);
    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, input, /*use*/ ctx[2])),
    					action_destroyer(/*forwardEvents*/ ctx[16].call(null, input)),
    					listen_dev(input, "change", /*input_change_handler*/ ctx[22])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*classes*/ 16384 && input_class_value !== (input_class_value = /*classes*/ ctx[14].input)) {
    				attr_dev(input, "class", input_class_value);
    			}

    			if (!current || dirty & /*disabled*/ 64) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[6]);
    			}

    			if (!current || dirty & /*required*/ 4096) {
    				prop_dev(input, "required", /*required*/ ctx[12]);
    			}

    			if (!current || dirty & /*value*/ 128) {
    				prop_dev(input, "__value", /*value*/ ctx[7]);
    				input.value = input.__value;
    			}

    			if (!current || dirty & /*id*/ 32) {
    				attr_dev(input, "id", /*id*/ ctx[5]);
    			}

    			if (!current || dirty & /*name*/ 2048) {
    				attr_dev(input, "name", /*name*/ ctx[11]);
    			}

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);

    			if (dirty & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}

    			if (!current || dirty & /*classes, disabled*/ 16448) {
    				toggle_class(input, "disabled", /*disabled*/ ctx[6]);
    			}

    			const themeicon_changes = {};
    			if (dirty & /*classes*/ 16384) themeicon_changes.class = /*classes*/ ctx[14].iconWrapper;
    			if (dirty & /*size*/ 1024) themeicon_changes.size = /*size*/ ctx[10];

    			if (dirty & /*$$scope, classes, indeterminate*/ 16793856) {
    				themeicon_changes.$$scope = { dirty, ctx };
    			}

    			themeicon.$set(themeicon_changes);

    			if (!current || dirty & /*classes*/ 16384 && div_class_value !== (div_class_value = /*classes*/ ctx[14].inner)) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (/*label*/ ctx[9]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$c(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(themeicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(themeicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(themeicon);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$g.name,
    		type: "slot",
    		source: "(31:0) <Box  bind:element  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{
    			class: /*cx*/ ctx[15](/*className*/ ctx[3], /*classes*/ ctx[14].root, /*getStyles*/ ctx[13]({ css: /*override*/ ctx[4] }))
    		},
    		/*$$restProps*/ ctx[17]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[23](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$g] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[1] !== void 0) {
    		box_props.element = /*element*/ ctx[1];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*cx, className, classes, getStyles, override, $$restProps*/ 188440)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*cx, className, classes, getStyles, override*/ 57368 && {
    						class: /*cx*/ ctx[15](/*className*/ ctx[3], /*classes*/ ctx[14].root, /*getStyles*/ ctx[13]({ css: /*override*/ ctx[4] }))
    					},
    					dirty & /*$$restProps*/ 131072 && get_spread_object(/*$$restProps*/ ctx[17])
    				])
    			: {};

    			if (dirty & /*$$scope, classes, id, label, size, indeterminate, disabled, required, value, name, checked, use*/ 16801765) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 2) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[1];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;

    	const omit_props_names = [
    		"use","element","class","override","color","id","disabled","value","checked","indeterminate","label","radius","size","name","required","transitionDuration"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Checkbox', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, color = 'blue', id = randomID(), disabled = false, value = null, checked = false, indeterminate = false, label = null, radius = 'sm', size = 'md', name = '', required = false, transitionDuration = 100 } = $$props;

    	/** An action that forwards inner dom node events from parent component */
    	const forwardEvents = createEventForwarder(get_current_component());

    	function input_change_handler() {
    		checked = this.checked;
    		($$invalidate(0, checked), $$invalidate(8, indeterminate));
    	}

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(1, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(17, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(1, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(4, override = $$new_props.override);
    		if ('color' in $$new_props) $$invalidate(18, color = $$new_props.color);
    		if ('id' in $$new_props) $$invalidate(5, id = $$new_props.id);
    		if ('disabled' in $$new_props) $$invalidate(6, disabled = $$new_props.disabled);
    		if ('value' in $$new_props) $$invalidate(7, value = $$new_props.value);
    		if ('checked' in $$new_props) $$invalidate(0, checked = $$new_props.checked);
    		if ('indeterminate' in $$new_props) $$invalidate(8, indeterminate = $$new_props.indeterminate);
    		if ('label' in $$new_props) $$invalidate(9, label = $$new_props.label);
    		if ('radius' in $$new_props) $$invalidate(19, radius = $$new_props.radius);
    		if ('size' in $$new_props) $$invalidate(10, size = $$new_props.size);
    		if ('name' in $$new_props) $$invalidate(11, name = $$new_props.name);
    		if ('required' in $$new_props) $$invalidate(12, required = $$new_props.required);
    		if ('transitionDuration' in $$new_props) $$invalidate(20, transitionDuration = $$new_props.transitionDuration);
    		if ('$$scope' in $$new_props) $$invalidate(24, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$8,
    		randomID,
    		get_current_component,
    		createEventForwarder,
    		useActions,
    		Box: Box$1,
    		ThemeIcon: ThemeIcon$1,
    		CheckboxIcon: CheckboxIcon$1,
    		use,
    		element,
    		className,
    		override,
    		color,
    		id,
    		disabled,
    		value,
    		checked,
    		indeterminate,
    		label,
    		radius,
    		size,
    		name,
    		required,
    		transitionDuration,
    		forwardEvents,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(4, override = $$new_props.override);
    		if ('color' in $$props) $$invalidate(18, color = $$new_props.color);
    		if ('id' in $$props) $$invalidate(5, id = $$new_props.id);
    		if ('disabled' in $$props) $$invalidate(6, disabled = $$new_props.disabled);
    		if ('value' in $$props) $$invalidate(7, value = $$new_props.value);
    		if ('checked' in $$props) $$invalidate(0, checked = $$new_props.checked);
    		if ('indeterminate' in $$props) $$invalidate(8, indeterminate = $$new_props.indeterminate);
    		if ('label' in $$props) $$invalidate(9, label = $$new_props.label);
    		if ('radius' in $$props) $$invalidate(19, radius = $$new_props.radius);
    		if ('size' in $$props) $$invalidate(10, size = $$new_props.size);
    		if ('name' in $$props) $$invalidate(11, name = $$new_props.name);
    		if ('required' in $$props) $$invalidate(12, required = $$new_props.required);
    		if ('transitionDuration' in $$props) $$invalidate(20, transitionDuration = $$new_props.transitionDuration);
    		if ('getStyles' in $$props) $$invalidate(13, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(14, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(15, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*indeterminate, checked*/ 257) {
    			$$invalidate(0, checked = indeterminate || checked);
    		}

    		if ($$self.$$.dirty & /*color, radius, size, transitionDuration*/ 1836032) {
    			$$invalidate(15, { cx, classes, getStyles } = useStyles$8({ color, radius, size, transitionDuration }, { name: 'Checkbox' }), cx, (((($$invalidate(14, classes), $$invalidate(18, color)), $$invalidate(19, radius)), $$invalidate(10, size)), $$invalidate(20, transitionDuration)), (((($$invalidate(13, getStyles), $$invalidate(18, color)), $$invalidate(19, radius)), $$invalidate(10, size)), $$invalidate(20, transitionDuration)));
    		}
    	};

    	return [
    		checked,
    		element,
    		use,
    		className,
    		override,
    		id,
    		disabled,
    		value,
    		indeterminate,
    		label,
    		size,
    		name,
    		required,
    		getStyles,
    		classes,
    		cx,
    		forwardEvents,
    		$$restProps,
    		color,
    		radius,
    		transitionDuration,
    		slots,
    		input_change_handler,
    		box_element_binding,
    		$$scope
    	];
    }

    class Checkbox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {
    			use: 2,
    			element: 1,
    			class: 3,
    			override: 4,
    			color: 18,
    			id: 5,
    			disabled: 6,
    			value: 7,
    			checked: 0,
    			indeterminate: 8,
    			label: 9,
    			radius: 19,
    			size: 10,
    			name: 11,
    			required: 12,
    			transitionDuration: 20
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Checkbox",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get use() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get indeterminate() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set indeterminate(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radius() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radius(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transitionDuration() {
    		throw new Error("<Checkbox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transitionDuration(value) {
    		throw new Error("<Checkbox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Checkbox$1 = Checkbox;

    var useStyles$6 = createStyles((theme, { size }) => {
        return {
            root: {
                lineHeight: theme.lineHeights.md.value
            },
            label: {
                [`${theme.dark} &`]: {
                    color: theme.fn.themeColor('dark', 0)
                },
                display: 'inline-block',
                marginBottom: 4,
                fontFamily: theme.fonts.standard.value ?? 'sans-serif',
                fontSize: theme.fontSizes[size].value,
                fontWeight: 500,
                color: theme.fn.themeColor('gray', 9),
                wordBreak: 'break-word',
                cursor: 'default',
                WebkitTapHighlightColor: 'transparent'
            },
            error: {
                [`${theme.dark} &`]: {
                    color: theme.fn.themeColor('red', 6)
                },
                marginTop: 5,
                wordBreak: 'break-word',
                color: theme.fn.themeColor('red', 7)
            },
            description: {
                [`${theme.dark} &`]: {
                    color: `${theme.fn.themeColor('dark', 2)} !important`
                },
                marginTop: -3,
                marginBottom: 7,
                wordBreak: 'break-word',
                color: `${theme.fn.themeColor('gray', 6)} !important`,
                fontSize: theme.fontSizes[size].value,
                lineHeight: 1.2
            },
            required: {
                [`${theme.dark} &`]: {
                    color: theme.fn.themeColor('red', 5)
                },
                color: theme.fn.themeColor('red', 7)
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/InputWrapper/LabelElement.svelte generated by Svelte v3.59.2 */
    const file$b = "../node_modules/@svelteuidev/core/dist/components/InputWrapper/LabelElement.svelte";

    // (14:1) {#if required}
    function create_if_block$b(ctx) {
    	let span;
    	let t_value = ' *' + "";
    	let t;
    	let span_class_value;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "class", span_class_value = /*classes*/ ctx[5].required);
    			attr_dev(span, "aria-hidden", "");
    			add_location(span, file$b, 14, 2, 437);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*classes*/ 32 && span_class_value !== (span_class_value = /*classes*/ ctx[5].required)) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(14:1) {#if required}",
    		ctx
    	});

    	return block;
    }

    // (12:0) <Box for={id} root={labelElement} class={className}>
    function create_default_slot$f(ctx) {
    	let t0;
    	let t1;
    	let if_block_anchor;
    	let if_block = /*required*/ ctx[3] && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			t0 = text(/*label*/ ctx[1]);
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 2) set_data_dev(t0, /*label*/ ctx[1]);

    			if (/*required*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$b(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$f.name,
    		type: "slot",
    		source: "(12:0) <Box for={id} root={labelElement} class={className}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let box;
    	let current;

    	box = new Box$1({
    			props: {
    				for: /*id*/ ctx[4],
    				root: /*labelElement*/ ctx[2],
    				class: /*className*/ ctx[0],
    				$$slots: { default: [create_default_slot$f] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = {};
    			if (dirty & /*id*/ 16) box_changes.for = /*id*/ ctx[4];
    			if (dirty & /*labelElement*/ 4) box_changes.root = /*labelElement*/ ctx[2];
    			if (dirty & /*className*/ 1) box_changes.class = /*className*/ ctx[0];

    			if (dirty & /*$$scope, classes, required, label*/ 106) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let classes;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LabelElement', slots, []);
    	let { class: className = 'label' } = $$props;
    	let { label = 'label' } = $$props;
    	let { labelElement = 'label' } = $$props;
    	let { required = false } = $$props;
    	let { id = undefined } = $$props;
    	const writable_props = ['class', 'label', 'labelElement', 'required', 'id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LabelElement> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, className = $$props.class);
    		if ('label' in $$props) $$invalidate(1, label = $$props.label);
    		if ('labelElement' in $$props) $$invalidate(2, labelElement = $$props.labelElement);
    		if ('required' in $$props) $$invalidate(3, required = $$props.required);
    		if ('id' in $$props) $$invalidate(4, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		Box: Box$1,
    		useStyles: useStyles$6,
    		className,
    		label,
    		labelElement,
    		required,
    		id,
    		classes
    	});

    	$$self.$inject_state = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('label' in $$props) $$invalidate(1, label = $$props.label);
    		if ('labelElement' in $$props) $$invalidate(2, labelElement = $$props.labelElement);
    		if ('required' in $$props) $$invalidate(3, required = $$props.required);
    		if ('id' in $$props) $$invalidate(4, id = $$props.id);
    		if ('classes' in $$props) $$invalidate(5, classes = $$props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(5, { classes } = useStyles$6({ size: 'md' }, { name: 'InputWrapper' }), classes);
    	return [className, label, labelElement, required, id, classes];
    }

    class LabelElement extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {
    			class: 0,
    			label: 1,
    			labelElement: 2,
    			required: 3,
    			id: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LabelElement",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get class() {
    		throw new Error("<LabelElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<LabelElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<LabelElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<LabelElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelElement() {
    		throw new Error("<LabelElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelElement(value) {
    		throw new Error("<LabelElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<LabelElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<LabelElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<LabelElement>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<LabelElement>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var LabelElement$1 = LabelElement;

    /* ../node_modules/@svelteuidev/core/dist/components/InputWrapper/InputWrapper.svelte generated by Svelte v3.59.2 */

    // (16:1) {#if label}
    function create_if_block_2$4(ctx) {
    	let labelelement;
    	let current;

    	const labelelement_spread_levels = [
    		{ class: /*classes*/ ctx[15].label },
    		/*labelProps*/ ctx[8],
    		{ label: /*label*/ ctx[4] },
    		{ id: /*id*/ ctx[11] },
    		{ labelElement: /*labelElement*/ ctx[12] },
    		{ required: /*required*/ ctx[7] }
    	];

    	let labelelement_props = {};

    	for (let i = 0; i < labelelement_spread_levels.length; i += 1) {
    		labelelement_props = assign(labelelement_props, labelelement_spread_levels[i]);
    	}

    	labelelement = new LabelElement$1({
    			props: labelelement_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(labelelement.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(labelelement, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const labelelement_changes = (dirty & /*classes, labelProps, label, id, labelElement, required*/ 39312)
    			? get_spread_update(labelelement_spread_levels, [
    					dirty & /*classes*/ 32768 && { class: /*classes*/ ctx[15].label },
    					dirty & /*labelProps*/ 256 && get_spread_object(/*labelProps*/ ctx[8]),
    					dirty & /*label*/ 16 && { label: /*label*/ ctx[4] },
    					dirty & /*id*/ 2048 && { id: /*id*/ ctx[11] },
    					dirty & /*labelElement*/ 4096 && { labelElement: /*labelElement*/ ctx[12] },
    					dirty & /*required*/ 128 && { required: /*required*/ ctx[7] }
    				])
    			: {};

    			labelelement.$set(labelelement_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labelelement.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labelelement.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(labelelement, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$4.name,
    		type: "if",
    		source: "(16:1) {#if label}",
    		ctx
    	});

    	return block;
    }

    // (19:1) {#if description}
    function create_if_block_1$6(ctx) {
    	let text_1;
    	let current;

    	const text_1_spread_levels = [
    		/*descriptionProps*/ ctx[9],
    		{ color: "gray" },
    		{ class: /*classes*/ ctx[15].description }
    	];

    	let text_1_props = {
    		$$slots: { default: [create_default_slot_2$6] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < text_1_spread_levels.length; i += 1) {
    		text_1_props = assign(text_1_props, text_1_spread_levels[i]);
    	}

    	text_1 = new Text$1({ props: text_1_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(text_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(text_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = (dirty & /*descriptionProps, classes*/ 33280)
    			? get_spread_update(text_1_spread_levels, [
    					dirty & /*descriptionProps*/ 512 && get_spread_object(/*descriptionProps*/ ctx[9]),
    					text_1_spread_levels[1],
    					dirty & /*classes*/ 32768 && { class: /*classes*/ ctx[15].description }
    				])
    			: {};

    			if (dirty & /*$$scope, description*/ 1048608) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(text_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$6.name,
    		type: "if",
    		source: "(19:1) {#if description}",
    		ctx
    	});

    	return block;
    }

    // (20:2) <Text {...descriptionProps} color="gray" class={classes.description}>
    function create_default_slot_2$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*description*/ ctx[5]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*description*/ 32) set_data_dev(t, /*description*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$6.name,
    		type: "slot",
    		source: "(20:2) <Text {...descriptionProps} color=\\\"gray\\\" class={classes.description}>",
    		ctx
    	});

    	return block;
    }

    // (25:1) {#if typeof error !== 'boolean' && error}
    function create_if_block$a(ctx) {
    	let text_1;
    	let current;

    	const text_1_spread_levels = [
    		/*errorProps*/ ctx[10],
    		{ size: /*size*/ ctx[13] },
    		{ class: /*classes*/ ctx[15].error }
    	];

    	let text_1_props = {
    		$$slots: { default: [create_default_slot_1$8] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < text_1_spread_levels.length; i += 1) {
    		text_1_props = assign(text_1_props, text_1_spread_levels[i]);
    	}

    	text_1 = new Text$1({ props: text_1_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(text_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(text_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = (dirty & /*errorProps, size, classes*/ 41984)
    			? get_spread_update(text_1_spread_levels, [
    					dirty & /*errorProps*/ 1024 && get_spread_object(/*errorProps*/ ctx[10]),
    					dirty & /*size*/ 8192 && { size: /*size*/ ctx[13] },
    					dirty & /*classes*/ 32768 && { class: /*classes*/ ctx[15].error }
    				])
    			: {};

    			if (dirty & /*$$scope, error*/ 1048640) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(text_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(25:1) {#if typeof error !== 'boolean' && error}",
    		ctx
    	});

    	return block;
    }

    // (26:2) <Text {...errorProps} {size} class={classes.error}>
    function create_default_slot_1$8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*error*/ ctx[6]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*error*/ 64) set_data_dev(t, /*error*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$8.name,
    		type: "slot",
    		source: "(26:2) <Text {...errorProps} {size} class={classes.error}>",
    		ctx
    	});

    	return block;
    }

    // (10:0) <Box  bind:element  {use}  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >
    function create_default_slot$e(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let if_block2_anchor;
    	let current;
    	let if_block0 = /*label*/ ctx[4] && create_if_block_2$4(ctx);
    	let if_block1 = /*description*/ ctx[5] && create_if_block_1$6(ctx);
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[20], null);
    	let if_block2 = typeof /*error*/ ctx[6] !== 'boolean' && /*error*/ ctx[6] && create_if_block$a(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			if_block2_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t1, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			insert_dev(target, t2, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, if_block2_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*label*/ ctx[4]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*label*/ 16) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2$4(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*description*/ ctx[5]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*description*/ 32) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1$6(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1048576)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[20],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[20])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[20], dirty, null),
    						null
    					);
    				}
    			}

    			if (typeof /*error*/ ctx[6] !== 'boolean' && /*error*/ ctx[6]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty & /*error*/ 64) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block$a(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(default_slot, local);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(default_slot, local);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(if_block2_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$e.name,
    		type: "slot",
    		source: "(10:0) <Box  bind:element  {use}  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{ use: /*use*/ ctx[1] },
    		{
    			class: /*cx*/ ctx[16](/*className*/ ctx[2], /*classes*/ ctx[15].root, /*getStyles*/ ctx[14]({ css: /*override*/ ctx[3] }))
    		},
    		/*$$restProps*/ ctx[17]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[19](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$e] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*use, cx, className, classes, getStyles, override, $$restProps*/ 245774)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*cx, className, classes, getStyles, override*/ 114700 && {
    						class: /*cx*/ ctx[16](/*className*/ ctx[2], /*classes*/ ctx[15].root, /*getStyles*/ ctx[14]({ css: /*override*/ ctx[3] }))
    					},
    					dirty & /*$$restProps*/ 131072 && get_spread_object(/*$$restProps*/ ctx[17])
    				])
    			: {};

    			if (dirty & /*$$scope, errorProps, size, classes, error, descriptionProps, description, labelProps, label, id, labelElement, required*/ 1097712) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;

    	const omit_props_names = [
    		"use","element","class","override","label","description","error","required","labelProps","descriptionProps","errorProps","id","labelElement","size"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('InputWrapper', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, label = undefined, description = null, error = null, required = false, labelProps = {}, descriptionProps = {}, errorProps = {}, id = 'input-id', labelElement = 'label', size = 'sm' } = $$props;

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(17, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('label' in $$new_props) $$invalidate(4, label = $$new_props.label);
    		if ('description' in $$new_props) $$invalidate(5, description = $$new_props.description);
    		if ('error' in $$new_props) $$invalidate(6, error = $$new_props.error);
    		if ('required' in $$new_props) $$invalidate(7, required = $$new_props.required);
    		if ('labelProps' in $$new_props) $$invalidate(8, labelProps = $$new_props.labelProps);
    		if ('descriptionProps' in $$new_props) $$invalidate(9, descriptionProps = $$new_props.descriptionProps);
    		if ('errorProps' in $$new_props) $$invalidate(10, errorProps = $$new_props.errorProps);
    		if ('id' in $$new_props) $$invalidate(11, id = $$new_props.id);
    		if ('labelElement' in $$new_props) $$invalidate(12, labelElement = $$new_props.labelElement);
    		if ('size' in $$new_props) $$invalidate(13, size = $$new_props.size);
    		if ('$$scope' in $$new_props) $$invalidate(20, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$6,
    		Box: Box$1,
    		Text: Text$1,
    		LabelElement: LabelElement$1,
    		use,
    		element,
    		className,
    		override,
    		label,
    		description,
    		error,
    		required,
    		labelProps,
    		descriptionProps,
    		errorProps,
    		id,
    		labelElement,
    		size,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('label' in $$props) $$invalidate(4, label = $$new_props.label);
    		if ('description' in $$props) $$invalidate(5, description = $$new_props.description);
    		if ('error' in $$props) $$invalidate(6, error = $$new_props.error);
    		if ('required' in $$props) $$invalidate(7, required = $$new_props.required);
    		if ('labelProps' in $$props) $$invalidate(8, labelProps = $$new_props.labelProps);
    		if ('descriptionProps' in $$props) $$invalidate(9, descriptionProps = $$new_props.descriptionProps);
    		if ('errorProps' in $$props) $$invalidate(10, errorProps = $$new_props.errorProps);
    		if ('id' in $$props) $$invalidate(11, id = $$new_props.id);
    		if ('labelElement' in $$props) $$invalidate(12, labelElement = $$new_props.labelElement);
    		if ('size' in $$props) $$invalidate(13, size = $$new_props.size);
    		if ('getStyles' in $$props) $$invalidate(14, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(15, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(16, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*size*/ 8192) {
    			$$invalidate(16, { cx, classes, getStyles } = useStyles$6({ size }, { name: 'InputWrapper' }), cx, ($$invalidate(15, classes), $$invalidate(13, size)), ($$invalidate(14, getStyles), $$invalidate(13, size)));
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		label,
    		description,
    		error,
    		required,
    		labelProps,
    		descriptionProps,
    		errorProps,
    		id,
    		labelElement,
    		size,
    		getStyles,
    		classes,
    		cx,
    		$$restProps,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class InputWrapper extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			label: 4,
    			description: 5,
    			error: 6,
    			required: 7,
    			labelProps: 8,
    			descriptionProps: 9,
    			errorProps: 10,
    			id: 11,
    			labelElement: 12,
    			size: 13
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "InputWrapper",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get use() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get error() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set error(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelProps() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelProps(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get descriptionProps() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set descriptionProps(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get errorProps() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set errorProps(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelElement() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelElement(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<InputWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<InputWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var InputWrapper$1 = InputWrapper;

    const POSITIONS = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
        apart: 'space-between'
    };
    var useStyles$5 = createStyles((theme, { align, direction, grow, noWrap, position, spacing, children }) => {
        return {
            root: {
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: direction,
                alignItems: align ||
                    (direction === 'row'
                        ? 'center'
                        : grow
                            ? 'stretch'
                            : position === 'apart'
                                ? 'flex-start'
                                : POSITIONS[position]),
                flexWrap: noWrap ? 'nowrap' : 'wrap',
                justifyContent: direction === 'row' ? POSITIONS[position] : undefined,
                gap: theme.fn.size({ size: spacing, sizes: theme.space }),
                '& > *': {
                    boxSizing: 'border-box',
                    maxWidth: grow && direction === 'row'
                        ? `calc(${100 / children}% - ${theme.fn.size({ size: spacing, sizes: theme.space }) -
                        theme.fn.size({ size: spacing, sizes: theme.space }) / children}px)`
                        : undefined,
                    flexGrow: grow ? 1 : 0
                }
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/Group/Group.svelte generated by Svelte v3.59.2 */

    // (39:0) <Box  bind:element  {use}  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >
    function create_default_slot$d(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$d.name,
    		type: "slot",
    		source: "(39:0) <Box  bind:element  {use}  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{ use: /*use*/ ctx[1] },
    		{
    			class: /*cx*/ ctx[6](/*className*/ ctx[2], /*classes*/ ctx[5].root, /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
    		},
    		/*$$restProps*/ ctx[7]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[16](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$d] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*use, cx, className, classes, getStyles, override, $$restProps*/ 254)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*cx, className, classes, getStyles, override*/ 124 && {
    						class: /*cx*/ ctx[6](/*className*/ ctx[2], /*classes*/ ctx[5].root, /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
    					},
    					dirty & /*$$restProps*/ 128 && get_spread_object(/*$$restProps*/ ctx[7])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 131072) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;

    	const omit_props_names = [
    		"use","element","class","override","position","noWrap","grow","spacing","direction","align"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Group', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, position = 'left', noWrap = false, grow = false, spacing = 'md', direction = 'row', align = 'center' } = $$props;

    	/** The children being rendered */
    	let children;

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('position' in $$new_props) $$invalidate(8, position = $$new_props.position);
    		if ('noWrap' in $$new_props) $$invalidate(9, noWrap = $$new_props.noWrap);
    		if ('grow' in $$new_props) $$invalidate(10, grow = $$new_props.grow);
    		if ('spacing' in $$new_props) $$invalidate(11, spacing = $$new_props.spacing);
    		if ('direction' in $$new_props) $$invalidate(12, direction = $$new_props.direction);
    		if ('align' in $$new_props) $$invalidate(13, align = $$new_props.align);
    		if ('$$scope' in $$new_props) $$invalidate(17, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$5,
    		onMount,
    		Box: Box$1,
    		use,
    		element,
    		className,
    		override,
    		position,
    		noWrap,
    		grow,
    		spacing,
    		direction,
    		align,
    		children,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('position' in $$props) $$invalidate(8, position = $$new_props.position);
    		if ('noWrap' in $$props) $$invalidate(9, noWrap = $$new_props.noWrap);
    		if ('grow' in $$props) $$invalidate(10, grow = $$new_props.grow);
    		if ('spacing' in $$props) $$invalidate(11, spacing = $$new_props.spacing);
    		if ('direction' in $$props) $$invalidate(12, direction = $$new_props.direction);
    		if ('align' in $$props) $$invalidate(13, align = $$new_props.align);
    		if ('children' in $$props) $$invalidate(14, children = $$new_props.children);
    		if ('getStyles' in $$props) $$invalidate(4, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(5, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(6, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*element*/ 1) {
    			/** can only get access to children at runtime */
    			onMount(() => {
    				$$invalidate(14, children = element.childElementCount);
    			});
    		}

    		if ($$self.$$.dirty & /*align, children, direction, grow, noWrap, position, spacing*/ 32512) {
    			$$invalidate(
    				6,
    				{ cx, classes, getStyles } = useStyles$5(
    					{
    						align,
    						children,
    						direction,
    						grow,
    						noWrap,
    						position,
    						spacing
    					},
    					{ name: 'Group' }
    				),
    				cx,
    				(((((((($$invalidate(5, classes), $$invalidate(13, align)), $$invalidate(14, children)), $$invalidate(12, direction)), $$invalidate(10, grow)), $$invalidate(9, noWrap)), $$invalidate(8, position)), $$invalidate(11, spacing)), $$invalidate(0, element)),
    				(((((((($$invalidate(4, getStyles), $$invalidate(13, align)), $$invalidate(14, children)), $$invalidate(12, direction)), $$invalidate(10, grow)), $$invalidate(9, noWrap)), $$invalidate(8, position)), $$invalidate(11, spacing)), $$invalidate(0, element))
    			);
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		getStyles,
    		classes,
    		cx,
    		$$restProps,
    		position,
    		noWrap,
    		grow,
    		spacing,
    		direction,
    		align,
    		children,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class Group extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			position: 8,
    			noWrap: 9,
    			grow: 10,
    			spacing: 11,
    			direction: 12,
    			align: 13
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Group",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get use() {
    		throw new Error("<Group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get position() {
    		throw new Error("<Group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set position(value) {
    		throw new Error("<Group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noWrap() {
    		throw new Error("<Group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noWrap(value) {
    		throw new Error("<Group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get grow() {
    		throw new Error("<Group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set grow(value) {
    		throw new Error("<Group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get spacing() {
    		throw new Error("<Group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set spacing(value) {
    		throw new Error("<Group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get direction() {
    		throw new Error("<Group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set direction(value) {
    		throw new Error("<Group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get align() {
    		throw new Error("<Group>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set align(value) {
    		throw new Error("<Group>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Group$1 = Group;

    var useStyles$4 = createStyles((theme, { fluid, size, sizes }) => {
        return {
            root: {
                paddingLeft: theme.fn.size({ size, sizes: theme.space }),
                paddingRight: theme.fn.size({ size, sizes: theme.space }),
                maxWidth: fluid ? '100%' : typeof size === 'number' ? `${size}px` : sizes[size] ?? sizes.md,
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/Container/Container.svelte generated by Svelte v3.59.2 */

    // (35:0) <Box  bind:element  {use}  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >
    function create_default_slot$c(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$c.name,
    		type: "slot",
    		source: "(35:0) <Box  bind:element  {use}  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{ use: /*use*/ ctx[1] },
    		{
    			class: /*cx*/ ctx[6](/*className*/ ctx[2], /*classes*/ ctx[5].root, /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
    		},
    		/*$$restProps*/ ctx[7]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[12](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$c] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*use, cx, className, classes, getStyles, override, $$restProps*/ 254)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*cx, className, classes, getStyles, override*/ 124 && {
    						class: /*cx*/ ctx[6](/*className*/ ctx[2], /*classes*/ ctx[5].root, /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
    					},
    					dirty & /*$$restProps*/ 128 && get_spread_object(/*$$restProps*/ ctx[7])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 8192) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;
    	const omit_props_names = ["use","element","class","override","size","fluid","sizes"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Container', slots, ['default']);

    	let { use = [], element = undefined, class: className = '', override = {}, size = 'md', fluid = false, sizes = {
    		xs: 540,
    		sm: 720,
    		md: 960,
    		lg: 1140,
    		xl: 1320
    	} } = $$props;

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('size' in $$new_props) $$invalidate(8, size = $$new_props.size);
    		if ('fluid' in $$new_props) $$invalidate(9, fluid = $$new_props.fluid);
    		if ('sizes' in $$new_props) $$invalidate(10, sizes = $$new_props.sizes);
    		if ('$$scope' in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$4,
    		Box: Box$1,
    		use,
    		element,
    		className,
    		override,
    		size,
    		fluid,
    		sizes,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('size' in $$props) $$invalidate(8, size = $$new_props.size);
    		if ('fluid' in $$props) $$invalidate(9, fluid = $$new_props.fluid);
    		if ('sizes' in $$props) $$invalidate(10, sizes = $$new_props.sizes);
    		if ('getStyles' in $$props) $$invalidate(4, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(5, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(6, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*fluid, size, sizes*/ 1792) {
    			$$invalidate(6, { cx, classes, getStyles } = useStyles$4({ fluid, size, sizes }, { name: 'Container' }), cx, ((($$invalidate(5, classes), $$invalidate(9, fluid)), $$invalidate(8, size)), $$invalidate(10, sizes)), ((($$invalidate(4, getStyles), $$invalidate(9, fluid)), $$invalidate(8, size)), $$invalidate(10, sizes)));
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		getStyles,
    		classes,
    		cx,
    		$$restProps,
    		size,
    		fluid,
    		sizes,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class Container extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			size: 8,
    			fluid: 9,
    			sizes: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Container",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get use() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fluid() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fluid(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sizes() {
    		throw new Error("<Container>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sizes(value) {
    		throw new Error("<Container>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Container$1 = Container;

    const sizes$2 = {
        xs: 30,
        sm: 36,
        md: 42,
        lg: 50,
        xl: 60
    };
    var useStyles$3 = createStyles((theme, { icon, iconWidth, invalid, multiline, radius, rightSectionWidth, size, resize, variant, showRightSection }) => {
        return {
            root: {
                darkMode: {
                    '&:disabled': {
                        backgroundColor: theme.fn.themeColor('dark', 6)
                    },
                    '&::placeholder': {
                        color: theme.fn.themeColor('dark', 3)
                    }
                },
                position: 'relative'
            },
            input: variant !== 'headless'
                ? {
                    height: multiline
                        ? 'auto'
                        : typeof size === 'number'
                            ? `${size}px`
                            : sizes$2[size] ?? sizes$2.md,
                    WebkitTapHighlightColor: 'transparent',
                    lineHeight: multiline ? '$md' : `${sizes$2[size] - 2}px`,
                    appearance: 'none',
                    resize,
                    boxSizing: 'border-box',
                    fontFamily: theme.fonts.standard.value ?? 'sans-serif',
                    fontSize: typeof size === 'number' ? `${size}px` : `${size}`,
                    width: '100%',
                    color: 'Black',
                    display: 'block',
                    textAlign: 'left',
                    minHeight: variant === 'default' || variant === 'filled' ? sizes$2[size] ?? sizes$2.md : null,
                    paddingLeft: (variant === 'default' && icon) || (variant === 'filled' && icon)
                        ? sizes$2[size] ?? sizes$2.md / 3
                        : 12,
                    paddingRight: variant === 'default' || variant === 'filled'
                        ? showRightSection
                            ? rightSectionWidth
                            : null
                        : null,
                    borderRadius: variant === 'default' || variant === 'filled' ? `$${radius}` : null,
                    '&:disabled': {
                        backgroundColor: theme.fn.themeColor('gray', 1),
                        color: theme.fn.themeColor('dark', 2),
                        opacity: 0.6,
                        cursor: 'not-allowed',
                        '&::placeholder': {
                            color: theme.fn.themeColor('dark', 2)
                        }
                    },
                    '&::placeholder': {
                        opacity: 1,
                        userSelect: 'none',
                        color: theme.fn.themeColor('gray', 5)
                    },
                    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration': {
                        appearance: 'none'
                    },
                    '&[type=number]': {
                        MozAppearance: 'textfield'
                    },
                    darkMode: {
                        color: theme.fn.themeColor('dark', 0)
                    }
                }
                : {},
            defaultVariant: {
                border: `1px solid ${theme.fn.themeColor('gray', 4)}`,
                backgroundColor: 'White',
                transition: 'border-color 100ms ease',
                minHeight: sizes$2[size] ?? sizes$2.md,
                '&:focus, &:focus-within': {
                    outline: 'none',
                    borderColor: theme.fn.themeColor('blue', 5)
                },
                darkMode: {
                    border: `1px solid ${theme.fn.themeColor('dark', 5)}`,
                    backgroundColor: theme.fn.themeColor('dark', 8),
                    '&:focus, &:focus-within': {
                        borderColor: theme.fn.themeColor('blue', 8)
                    }
                }
            },
            filledVariant: {
                border: '1px solid transparent',
                backgroundColor: theme.fn.themeColor('gray', 1),
                minHeight: sizes$2[size] ?? sizes$2.md,
                '&:focus, &:focus-within': {
                    outline: 'none',
                    borderColor: `${theme.fn.themeColor('blue', 5)} !important`
                },
                darkMode: {
                    backgroundColor: theme.fn.themeColor('dark', 5),
                    '&:focus, &:focus-within': {
                        borderColor: `${theme.fn.themeColor('blue', 8)} !important`
                    }
                }
            },
            unstyledVariant: {
                height: multiline ? undefined : 'auto',
                borderWidth: 0,
                color: 'Black',
                backgroundColor: 'transparent',
                minHeight: 28,
                outline: 0,
                '&:focus, &:focus-within': {
                    outline: 'none',
                    borderColor: 'transparent'
                },
                '&:disabled': {
                    backgroundColor: 'transparent',
                    '&:focus, &:focus-within': {
                        outline: 'none',
                        borderColor: 'transparent'
                    }
                }
            },
            withIcon: {
                paddingLeft: typeof iconWidth === 'number' ? `${iconWidth}px` : sizes$2[size] ?? sizes$2.md
            },
            iconWrapper: {
                pointerEvents: 'none',
                position: 'absolute',
                zIndex: 1,
                left: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: iconWidth ? `${iconWidth}px` : sizes$2[size] ?? sizes$2.md
            },
            disabled: {
                backgroundColor: theme.fn.themeColor('gray', 1),
                color: theme.fn.themeColor('dark', 2),
                opacity: 0.6,
                cursor: 'not-allowed',
                '&::placeholder': {
                    color: theme.fn.themeColor('dark', 2)
                },
                darkMode: {
                    backgroundColor: theme.fn.themeColor('dark', 6),
                    borderColor: theme.fn.themeColor('dark', 4)
                }
            },
            invalid: {
                color: theme.fn.themeColor('red', 7),
                borderColor: theme.fn.themeColor('red', 7),
                '&::placeholder': {
                    opacity: 1,
                    color: theme.fn.themeColor('red', 7)
                },
                darkMode: {
                    color: theme.fn.themeColor('red', 6),
                    borderColor: theme.fn.themeColor('red', 6),
                    '&::placeholder': {
                        color: theme.fn.themeColor('red', 6)
                    }
                }
            },
            icon: {
                color: invalid ? theme.fn.themeColor('red', 7) : theme.fn.themeColor('gray', 5),
                pointerEvents: 'none',
                darkMode: {
                    color: invalid ? theme.fn.themeColor('red', 6) : theme.fn.themeColor('dark', 2)
                }
            },
            rightSection: {
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: rightSectionWidth
            },
            noPointerEvents: {
                pointerEvents: 'none'
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/Input/Input.svelte generated by Svelte v3.59.2 */
    const file$a = "../node_modules/@svelteuidev/core/dist/components/Input/Input.svelte";
    const get_rightSection_slot_changes$1 = dirty => ({});
    const get_rightSection_slot_context$1 = ctx => ({});
    const get_icon_slot_changes$1 = dirty => ({});
    const get_icon_slot_context$1 = ctx => ({});

    // (147:51) 
    function create_if_block_5$2(ctx) {
    	let switch_instance;
    	let updating_element;
    	let updating_value;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{
    			use: [/*forwardEvents*/ ctx[28], [useActions, /*use*/ ctx[2]]]
    		},
    		{ "aria-invalid": /*invalid*/ ctx[15] },
    		{
    			class: /*cx*/ ctx[26](
    				/*className*/ ctx[3],
    				{
    					[/*classes*/ ctx[25].disabled]: /*disabled*/ ctx[14],
    					[/*classes*/ ctx[25].invalid]: /*invalid*/ ctx[15],
    					[/*classes*/ ctx[25].withIcon]: /*icon*/ ctx[6] || /*isIconSlotUsed*/ ctx[27]
    				},
    				/*classes*/ ctx[25][`${/*variant*/ ctx[13]}Variant`] ?? {}
    			)
    		},
    		{ disabled: /*disabled*/ ctx[14] },
    		{ required: /*required*/ ctx[12] },
    		{ id: /*id*/ ctx[11] },
    		{ type: /*type*/ ctx[17] },
    		{ autofocus: /*autofocus*/ ctx[19] },
    		/*$$restProps*/ ctx[33]
    	];

    	function switch_instance_element_binding(value) {
    		/*switch_instance_element_binding*/ ctx[43](value);
    	}

    	function switch_instance_value_binding(value) {
    		/*switch_instance_value_binding*/ ctx[44](value);
    	}

    	var switch_value = /*root*/ ctx[5];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_1$7] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		if (/*element*/ ctx[0] !== void 0) {
    			switch_instance_props.element = /*element*/ ctx[0];
    		}

    		if (/*value*/ ctx[1] !== void 0) {
    			switch_instance_props.value = /*value*/ ctx[1];
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    		binding_callbacks.push(() => bind(switch_instance, 'element', switch_instance_element_binding));
    		binding_callbacks.push(() => bind(switch_instance, 'value', switch_instance_value_binding));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty[0] & /*forwardEvents, use, invalid, cx, className, classes, disabled, icon, isIconSlotUsed, variant, required, id, type, autofocus*/ 504035404 | dirty[1] & /*$$restProps*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty[0] & /*forwardEvents, use*/ 268435460 && {
    						use: [/*forwardEvents*/ ctx[28], [useActions, /*use*/ ctx[2]]]
    					},
    					dirty[0] & /*invalid*/ 32768 && { "aria-invalid": /*invalid*/ ctx[15] },
    					dirty[0] & /*cx, className, classes, disabled, invalid, icon, isIconSlotUsed, variant*/ 234938440 && {
    						class: /*cx*/ ctx[26](
    							/*className*/ ctx[3],
    							{
    								[/*classes*/ ctx[25].disabled]: /*disabled*/ ctx[14],
    								[/*classes*/ ctx[25].invalid]: /*invalid*/ ctx[15],
    								[/*classes*/ ctx[25].withIcon]: /*icon*/ ctx[6] || /*isIconSlotUsed*/ ctx[27]
    							},
    							/*classes*/ ctx[25][`${/*variant*/ ctx[13]}Variant`] ?? {}
    						)
    					},
    					dirty[0] & /*disabled*/ 16384 && { disabled: /*disabled*/ ctx[14] },
    					dirty[0] & /*required*/ 4096 && { required: /*required*/ ctx[12] },
    					dirty[0] & /*id*/ 2048 && { id: /*id*/ ctx[11] },
    					dirty[0] & /*type*/ 131072 && { type: /*type*/ ctx[17] },
    					dirty[0] & /*autofocus*/ 524288 && { autofocus: /*autofocus*/ ctx[19] },
    					dirty[1] & /*$$restProps*/ 4 && get_spread_object(/*$$restProps*/ ctx[33])
    				])
    			: {};

    			if (dirty[1] & /*$$scope*/ 32768) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty[0] & /*element*/ 1) {
    				updating_element = true;
    				switch_instance_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			if (!updating_value && dirty[0] & /*value*/ 2) {
    				updating_value = true;
    				switch_instance_changes.value = /*value*/ ctx[1];
    				add_flush_callback(() => updating_value = false);
    			}

    			if (dirty[0] & /*root*/ 32 && switch_value !== (switch_value = /*root*/ ctx[5])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					binding_callbacks.push(() => bind(switch_instance, 'element', switch_instance_element_binding));
    					binding_callbacks.push(() => bind(switch_instance, 'value', switch_instance_value_binding));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$2.name,
    		type: "if",
    		source: "(147:51) ",
    		ctx
    	});

    	return block;
    }

    // (111:50) 
    function create_if_block_4$2(ctx) {
    	let current;
    	validate_dynamic_element(/*castRoot*/ ctx[29]());
    	validate_void_dynamic_element(/*castRoot*/ ctx[29]());
    	let svelte_element = /*castRoot*/ ctx[29]() && create_dynamic_element(ctx);

    	const block = {
    		c: function create() {
    			if (svelte_element) svelte_element.c();
    		},
    		m: function mount(target, anchor) {
    			if (svelte_element) svelte_element.m(target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*castRoot*/ ctx[29]()) {
    				svelte_element.p(ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svelte_element);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svelte_element);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (svelte_element) svelte_element.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$2.name,
    		type: "if",
    		source: "(111:50) ",
    		ctx
    	});

    	return block;
    }

    // (84:1) {#if isHTMLElement && root === 'input'}
    function create_if_block_3$3(ctx) {
    	let input;
    	let input_class_value;
    	let useActions_action;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		{ value: /*value*/ ctx[1] },
    		{ type: /*type*/ ctx[17] },
    		{ required: /*required*/ ctx[12] },
    		{ disabled: /*disabled*/ ctx[14] },
    		{ id: /*id*/ ctx[11] },
    		{ placeholder: /*placeholder*/ ctx[18] },
    		{ autocomplete: /*autocomplete*/ ctx[16] },
    		{ autofocus: /*autofocus*/ ctx[19] },
    		{ "aria-invalid": /*invalid*/ ctx[15] },
    		{
    			class: input_class_value = /*cx*/ ctx[26](
    				/*className*/ ctx[3],
    				/*classes*/ ctx[25].input,
    				{
    					[/*classes*/ ctx[25].disabled]: /*disabled*/ ctx[14],
    					[/*classes*/ ctx[25].invalid]: /*invalid*/ ctx[15],
    					[/*classes*/ ctx[25].withIcon]: /*icon*/ ctx[6] || /*isIconSlotUsed*/ ctx[27]
    				},
    				/*classes*/ ctx[25][`${/*variant*/ ctx[13]}Variant`] ?? {}
    			)
    		},
    		/*$$restProps*/ ctx[33]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$a, 84, 2, 3112);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);

    			if ('value' in input_data) {
    				input.value = input_data.value;
    			}

    			if (input.autofocus) input.focus();
    			/*input_binding*/ ctx[41](input);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(useActions_action = useActions.call(null, input, /*use*/ ctx[2])),
    					action_destroyer(/*forwardEvents*/ ctx[28].call(null, input)),
    					listen_dev(input, "input", /*onInput*/ ctx[31], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*value*/ 2 && input.value !== /*value*/ ctx[1] && { value: /*value*/ ctx[1] },
    				dirty[0] & /*type*/ 131072 && { type: /*type*/ ctx[17] },
    				dirty[0] & /*required*/ 4096 && { required: /*required*/ ctx[12] },
    				dirty[0] & /*disabled*/ 16384 && { disabled: /*disabled*/ ctx[14] },
    				dirty[0] & /*id*/ 2048 && { id: /*id*/ ctx[11] },
    				dirty[0] & /*placeholder*/ 262144 && { placeholder: /*placeholder*/ ctx[18] },
    				dirty[0] & /*autocomplete*/ 65536 && { autocomplete: /*autocomplete*/ ctx[16] },
    				dirty[0] & /*autofocus*/ 524288 && { autofocus: /*autofocus*/ ctx[19] },
    				dirty[0] & /*invalid*/ 32768 && { "aria-invalid": /*invalid*/ ctx[15] },
    				dirty[0] & /*cx, className, classes, disabled, invalid, icon, isIconSlotUsed, variant*/ 234938440 && input_class_value !== (input_class_value = /*cx*/ ctx[26](
    					/*className*/ ctx[3],
    					/*classes*/ ctx[25].input,
    					{
    						[/*classes*/ ctx[25].disabled]: /*disabled*/ ctx[14],
    						[/*classes*/ ctx[25].invalid]: /*invalid*/ ctx[15],
    						[/*classes*/ ctx[25].withIcon]: /*icon*/ ctx[6] || /*isIconSlotUsed*/ ctx[27]
    					},
    					/*classes*/ ctx[25][`${/*variant*/ ctx[13]}Variant`] ?? {}
    				)) && { class: input_class_value },
    				dirty[1] & /*$$restProps*/ 4 && /*$$restProps*/ ctx[33]
    			]));

    			if ('value' in input_data) {
    				input.value = input_data.value;
    			}

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding*/ ctx[41](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$3.name,
    		type: "if",
    		source: "(84:1) {#if isHTMLElement && root === 'input'}",
    		ctx
    	});

    	return block;
    }

    // (148:2) <svelte:component    this={root}    bind:element    bind:value    use={[forwardEvents, [useActions, use]]}    aria-invalid={invalid}    class={cx(     className,     {      [classes.disabled]: disabled,      [classes.invalid]: invalid,      [classes.withIcon]: icon || isIconSlotUsed     },     classes[`${variant}Variant`] ?? {}    )}    {disabled}    {required}    {id}    {type}    {autofocus}    {...$$restProps}   >
    function create_default_slot_1$7(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[40].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[46], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[46],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[46])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[46], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$7.name,
    		type: "slot",
    		source: "(148:2) <svelte:component    this={root}    bind:element    bind:value    use={[forwardEvents, [useActions, use]]}    aria-invalid={invalid}    class={cx(     className,     {      [classes.disabled]: disabled,      [classes.invalid]: invalid,      [classes.withIcon]: icon || isIconSlotUsed     },     classes[`${variant}Variant`] ?? {}    )}    {disabled}    {required}    {id}    {type}    {autofocus}    {...$$restProps}   >",
    		ctx
    	});

    	return block;
    }

    // (115:2) <svelte:element    this={castRoot()}    bind:this={element}    {value}    {required}    {disabled}    {id}    {placeholder}    {autocomplete}    {type}    {autofocus}    aria-invalid={invalid}    class:disabled    class:invalid    class={cx(     className,     classes.input,     {      [classes.disabled]: disabled,      [classes.invalid]: invalid,      [classes.withIcon]: icon || isIconSlotUsed     },     classes[`${variant}Variant`] ?? {}    )}    on:change={onChange}    on:input={onInput}    use:useActions={use}    use:forwardEvents    {...$$restProps}   >
    function create_dynamic_element(ctx) {
    	let svelte_element;
    	let svelte_element_class_value;
    	let useActions_action;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[40].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[46], null);

    	let svelte_element_levels = [
    		{ value: /*value*/ ctx[1] },
    		{ required: /*required*/ ctx[12] },
    		{ disabled: /*disabled*/ ctx[14] },
    		{ id: /*id*/ ctx[11] },
    		{ placeholder: /*placeholder*/ ctx[18] },
    		{ autocomplete: /*autocomplete*/ ctx[16] },
    		{ type: /*type*/ ctx[17] },
    		{ autofocus: /*autofocus*/ ctx[19] },
    		{ "aria-invalid": /*invalid*/ ctx[15] },
    		{
    			class: svelte_element_class_value = /*cx*/ ctx[26](
    				/*className*/ ctx[3],
    				/*classes*/ ctx[25].input,
    				{
    					[/*classes*/ ctx[25].disabled]: /*disabled*/ ctx[14],
    					[/*classes*/ ctx[25].invalid]: /*invalid*/ ctx[15],
    					[/*classes*/ ctx[25].withIcon]: /*icon*/ ctx[6] || /*isIconSlotUsed*/ ctx[27]
    				},
    				/*classes*/ ctx[25][`${/*variant*/ ctx[13]}Variant`] ?? {}
    			)
    		},
    		/*$$restProps*/ ctx[33]
    	];

    	let svelte_element_data = {};

    	for (let i = 0; i < svelte_element_levels.length; i += 1) {
    		svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svelte_element = element(/*castRoot*/ ctx[29]());
    			if (default_slot) default_slot.c();
    			set_dynamic_element_data(/*castRoot*/ ctx[29]())(svelte_element, svelte_element_data);
    			toggle_class(svelte_element, "disabled", /*disabled*/ ctx[14]);
    			toggle_class(svelte_element, "invalid", /*invalid*/ ctx[15]);
    			add_location(svelte_element, file$a, 114, 2, 3826);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svelte_element, anchor);

    			if (default_slot) {
    				default_slot.m(svelte_element, null);
    			}

    			/*svelte_element_binding*/ ctx[42](svelte_element);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(svelte_element, "change", /*onChange*/ ctx[30], false, false, false, false),
    					listen_dev(svelte_element, "input", /*onInput*/ ctx[31], false, false, false, false),
    					action_destroyer(useActions_action = useActions.call(null, svelte_element, /*use*/ ctx[2])),
    					action_destroyer(/*forwardEvents*/ ctx[28].call(null, svelte_element))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[1] & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[46],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[46])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[46], dirty, null),
    						null
    					);
    				}
    			}

    			set_dynamic_element_data(/*castRoot*/ ctx[29]())(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
    				(!current || dirty[0] & /*value*/ 2) && { value: /*value*/ ctx[1] },
    				(!current || dirty[0] & /*required*/ 4096) && { required: /*required*/ ctx[12] },
    				(!current || dirty[0] & /*disabled*/ 16384) && { disabled: /*disabled*/ ctx[14] },
    				(!current || dirty[0] & /*id*/ 2048) && { id: /*id*/ ctx[11] },
    				(!current || dirty[0] & /*placeholder*/ 262144) && { placeholder: /*placeholder*/ ctx[18] },
    				(!current || dirty[0] & /*autocomplete*/ 65536) && { autocomplete: /*autocomplete*/ ctx[16] },
    				(!current || dirty[0] & /*type*/ 131072) && { type: /*type*/ ctx[17] },
    				(!current || dirty[0] & /*autofocus*/ 524288) && { autofocus: /*autofocus*/ ctx[19] },
    				(!current || dirty[0] & /*invalid*/ 32768) && { "aria-invalid": /*invalid*/ ctx[15] },
    				(!current || dirty[0] & /*cx, className, classes, disabled, invalid, icon, isIconSlotUsed, variant*/ 234938440 && svelte_element_class_value !== (svelte_element_class_value = /*cx*/ ctx[26](
    					/*className*/ ctx[3],
    					/*classes*/ ctx[25].input,
    					{
    						[/*classes*/ ctx[25].disabled]: /*disabled*/ ctx[14],
    						[/*classes*/ ctx[25].invalid]: /*invalid*/ ctx[15],
    						[/*classes*/ ctx[25].withIcon]: /*icon*/ ctx[6] || /*isIconSlotUsed*/ ctx[27]
    					},
    					/*classes*/ ctx[25][`${/*variant*/ ctx[13]}Variant`] ?? {}
    				))) && { class: svelte_element_class_value },
    				dirty[1] & /*$$restProps*/ 4 && /*$$restProps*/ ctx[33]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/ 4) useActions_action.update.call(null, /*use*/ ctx[2]);
    			toggle_class(svelte_element, "disabled", /*disabled*/ ctx[14]);
    			toggle_class(svelte_element, "invalid", /*invalid*/ ctx[15]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svelte_element);
    			if (default_slot) default_slot.d(detaching);
    			/*svelte_element_binding*/ ctx[42](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_dynamic_element.name,
    		type: "child_dynamic_element",
    		source: "(115:2) <svelte:element    this={castRoot()}    bind:this={element}    {value}    {required}    {disabled}    {id}    {placeholder}    {autocomplete}    {type}    {autofocus}    aria-invalid={invalid}    class:disabled    class:invalid    class={cx(     className,     classes.input,     {      [classes.disabled]: disabled,      [classes.invalid]: invalid,      [classes.withIcon]: icon || isIconSlotUsed     },     classes[`${variant}Variant`] ?? {}    )}    on:change={onChange}    on:input={onInput}    use:useActions={use}    use:forwardEvents    {...$$restProps}   >",
    		ctx
    	});

    	return block;
    }

    // (176:3) {#if icon}
    function create_if_block_2$3(ctx) {
    	let div;
    	let iconrenderer;
    	let div_class_value;
    	let current;

    	iconrenderer = new IconRenderer$1({
    			props: {
    				icon: /*icon*/ ctx[6],
    				iconProps: /*iconProps*/ ctx[7],
    				iconSize: 16
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(iconrenderer.$$.fragment);
    			attr_dev(div, "class", div_class_value = /*classes*/ ctx[25].icon);
    			add_location(div, file$a, 176, 4, 5174);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(iconrenderer, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const iconrenderer_changes = {};
    			if (dirty[0] & /*icon*/ 64) iconrenderer_changes.icon = /*icon*/ ctx[6];
    			if (dirty[0] & /*iconProps*/ 128) iconrenderer_changes.iconProps = /*iconProps*/ ctx[7];
    			iconrenderer.$set(iconrenderer_changes);

    			if (!current || dirty[0] & /*classes*/ 33554432 && div_class_value !== (div_class_value = /*classes*/ ctx[25].icon)) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconrenderer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(iconrenderer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(iconrenderer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(176:3) {#if icon}",
    		ctx
    	});

    	return block;
    }

    // (175:20)     
    function fallback_block$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*icon*/ ctx[6] && create_if_block_2$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*icon*/ ctx[6]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty[0] & /*icon*/ 64) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$1.name,
    		type: "fallback",
    		source: "(175:20)     ",
    		ctx
    	});

    	return block;
    }

    // (184:1) {#if icon && $$slots.icon && !isIconSlotUsed}
    function create_if_block_1$5(ctx) {
    	let div;
    	let iconrenderer;
    	let div_class_value;
    	let current;

    	iconrenderer = new IconRenderer$1({
    			props: {
    				icon: /*icon*/ ctx[6],
    				iconProps: /*iconProps*/ ctx[7],
    				iconSize: 16
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(iconrenderer.$$.fragment);
    			attr_dev(div, "class", div_class_value = /*cx*/ ctx[26](/*classes*/ ctx[25].icon, /*classes*/ ctx[25].iconWrapper));
    			add_location(div, file$a, 184, 2, 5444);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(iconrenderer, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const iconrenderer_changes = {};
    			if (dirty[0] & /*icon*/ 64) iconrenderer_changes.icon = /*icon*/ ctx[6];
    			if (dirty[0] & /*iconProps*/ 128) iconrenderer_changes.iconProps = /*iconProps*/ ctx[7];
    			iconrenderer.$set(iconrenderer_changes);

    			if (!current || dirty[0] & /*cx, classes*/ 100663296 && div_class_value !== (div_class_value = /*cx*/ ctx[26](/*classes*/ ctx[25].icon, /*classes*/ ctx[25].iconWrapper))) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconrenderer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(iconrenderer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(iconrenderer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(184:1) {#if icon && $$slots.icon && !isIconSlotUsed}",
    		ctx
    	});

    	return block;
    }

    // (189:1) {#if showRightSection}
    function create_if_block$9(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	const rightSection_slot_template = /*#slots*/ ctx[40].rightSection;
    	const rightSection_slot = create_slot(rightSection_slot_template, ctx, /*$$scope*/ ctx[46], get_rightSection_slot_context$1);

    	let div_levels = [
    		/*rightSectionProps*/ ctx[9],
    		{
    			class: div_class_value = /*cx*/ ctx[26](/*classes*/ ctx[25].rightSection, {
    				[/*classes*/ ctx[25].noPointerEvents]: /*noPointerEventsRightSection*/ ctx[20]
    			})
    		}
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (rightSection_slot) rightSection_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$a, 189, 2, 5591);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (rightSection_slot) {
    				rightSection_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (rightSection_slot) {
    				if (rightSection_slot.p && (!current || dirty[1] & /*$$scope*/ 32768)) {
    					update_slot_base(
    						rightSection_slot,
    						rightSection_slot_template,
    						ctx,
    						/*$$scope*/ ctx[46],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[46])
    						: get_slot_changes(rightSection_slot_template, /*$$scope*/ ctx[46], dirty, get_rightSection_slot_changes$1),
    						get_rightSection_slot_context$1
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty[0] & /*rightSectionProps*/ 512 && /*rightSectionProps*/ ctx[9],
    				(!current || dirty[0] & /*cx, classes, noPointerEventsRightSection*/ 101711872 && div_class_value !== (div_class_value = /*cx*/ ctx[26](/*classes*/ ctx[25].rightSection, {
    					[/*classes*/ ctx[25].noPointerEvents]: /*noPointerEventsRightSection*/ ctx[20]
    				}))) && { class: div_class_value }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rightSection_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rightSection_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (rightSection_slot) rightSection_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(189:1) {#if showRightSection}",
    		ctx
    	});

    	return block;
    }

    // (83:0) <Box {...wrapperProps} class={cx(classes.root, getStyles({ css: override }))} {...$$restProps}>
    function create_default_slot$b(ctx) {
    	let show_if;
    	let current_block_type_index;
    	let if_block0;
    	let t0;
    	let span;
    	let span_class_value;
    	let t1;
    	let t2;
    	let if_block2_anchor;
    	let current;
    	const if_block_creators = [create_if_block_3$3, create_if_block_4$2, create_if_block_5$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (dirty[0] & /*isHTMLElement, root*/ 4194336) show_if = null;
    		if (/*isHTMLElement*/ ctx[22] && /*root*/ ctx[5] === 'input') return 0;
    		if (show_if == null) show_if = !!(/*isHTMLElement*/ ctx[22] && isInput(String(/*root*/ ctx[5])));
    		if (show_if) return 1;
    		if (/*isComponent*/ ctx[23] && typeof /*root*/ ctx[5] !== 'string') return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx, [-1, -1]))) {
    		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const icon_slot_template = /*#slots*/ ctx[40].icon;
    	const icon_slot = create_slot(icon_slot_template, ctx, /*$$scope*/ ctx[46], get_icon_slot_context$1);
    	const icon_slot_or_fallback = icon_slot || fallback_block$1(ctx);
    	let if_block1 = /*icon*/ ctx[6] && /*$$slots*/ ctx[32].icon && !/*isIconSlotUsed*/ ctx[27] && create_if_block_1$5(ctx);
    	let if_block2 = /*showRightSection*/ ctx[8] && create_if_block$9(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			span = element("span");
    			if (icon_slot_or_fallback) icon_slot_or_fallback.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			if_block2_anchor = empty();

    			attr_dev(span, "class", span_class_value = /*cx*/ ctx[26]({
    				[/*classes*/ ctx[25].iconWrapper]: !!/*icon*/ ctx[6] || /*isIconSlotUsed*/ ctx[27]
    			}));

    			add_location(span, file$a, 173, 1, 5040);
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);

    			if (icon_slot_or_fallback) {
    				icon_slot_or_fallback.m(span, null);
    			}

    			/*span_binding*/ ctx[45](span);
    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, if_block2_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx, dirty);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block0) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block0 = if_blocks[current_block_type_index];

    					if (!if_block0) {
    						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block0.c();
    					} else {
    						if_block0.p(ctx, dirty);
    					}

    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				} else {
    					if_block0 = null;
    				}
    			}

    			if (icon_slot) {
    				if (icon_slot.p && (!current || dirty[1] & /*$$scope*/ 32768)) {
    					update_slot_base(
    						icon_slot,
    						icon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[46],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[46])
    						: get_slot_changes(icon_slot_template, /*$$scope*/ ctx[46], dirty, get_icon_slot_changes$1),
    						get_icon_slot_context$1
    					);
    				}
    			} else {
    				if (icon_slot_or_fallback && icon_slot_or_fallback.p && (!current || dirty[0] & /*classes, icon, iconProps*/ 33554624)) {
    					icon_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*cx, classes, icon, isIconSlotUsed*/ 234881088 && span_class_value !== (span_class_value = /*cx*/ ctx[26]({
    				[/*classes*/ ctx[25].iconWrapper]: !!/*icon*/ ctx[6] || /*isIconSlotUsed*/ ctx[27]
    			}))) {
    				attr_dev(span, "class", span_class_value);
    			}

    			if (/*icon*/ ctx[6] && /*$$slots*/ ctx[32].icon && !/*isIconSlotUsed*/ ctx[27]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*icon, isIconSlotUsed*/ 134217792 | dirty[1] & /*$$slots*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1$5(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t2.parentNode, t2);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*showRightSection*/ ctx[8]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty[0] & /*showRightSection*/ 256) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block$9(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(icon_slot_or_fallback, local);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(icon_slot_or_fallback, local);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    			if (icon_slot_or_fallback) icon_slot_or_fallback.d(detaching);
    			/*span_binding*/ ctx[45](null);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(if_block2_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$b.name,
    		type: "slot",
    		source: "(83:0) <Box {...wrapperProps} class={cx(classes.root, getStyles({ css: override }))} {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let box;
    	let current;

    	const box_spread_levels = [
    		/*wrapperProps*/ ctx[10],
    		{
    			class: /*cx*/ ctx[26](/*classes*/ ctx[25].root, /*getStyles*/ ctx[24]({ css: /*override*/ ctx[4] }))
    		},
    		/*$$restProps*/ ctx[33]
    	];

    	let box_props = {
    		$$slots: { default: [create_default_slot$b] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	box = new Box$1({ props: box_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const box_changes = (dirty[0] & /*wrapperProps, cx, classes, getStyles, override*/ 117441552 | dirty[1] & /*$$restProps*/ 4)
    			? get_spread_update(box_spread_levels, [
    					dirty[0] & /*wrapperProps*/ 1024 && get_spread_object(/*wrapperProps*/ ctx[10]),
    					dirty[0] & /*cx, classes, getStyles, override*/ 117440528 && {
    						class: /*cx*/ ctx[26](/*classes*/ ctx[25].root, /*getStyles*/ ctx[24]({ css: /*override*/ ctx[4] }))
    					},
    					dirty[1] & /*$$restProps*/ 4 && get_spread_object(/*$$restProps*/ ctx[33])
    				])
    			: {};

    			if (dirty[0] & /*rightSectionProps, cx, classes, noPointerEventsRightSection, showRightSection, icon, iconProps, isIconSlotUsed, iconElement, value, type, required, disabled, id, placeholder, autocomplete, autofocus, invalid, className, variant, element, use, isHTMLElement, root, isComponent*/ 251657199 | dirty[1] & /*$$scope, $$slots, $$restProps*/ 32774) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function isInput(root) {
    	return ['input', 'select', 'textarea', 'datalist'].includes(root);
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let isIconSlotUsed;
    	let cx;
    	let classes;
    	let getStyles;

    	const omit_props_names = [
    		"use","element","class","override","root","icon","iconWidth","iconProps","showRightSection","rightSectionWidth","rightSectionProps","wrapperProps","id","required","radius","variant","disabled","size","value","invalid","multiline","autocomplete","type","placeholder","autofocus","resize","noPointerEventsRightSection"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Input', slots, ['default','icon','rightSection']);
    	const $$slots = compute_slots(slots);
    	let { use = [], element = undefined, class: className = '', override = {}, root = 'input', icon = null, iconWidth = 36, iconProps = { size: 20, color: 'currentColor' }, showRightSection = $$slots.rightSection, rightSectionWidth = 36, rightSectionProps = {}, wrapperProps = {}, id = 'input-id', required = false, radius = 'sm', variant = 'default', disabled = false, size = 'sm', value = '', invalid = false, multiline = false, autocomplete = 'on', type = 'text', placeholder = undefined, autofocus = undefined, resize = 'none', noPointerEventsRightSection = false } = $$props;

    	/** An action that forwards inner dom node events from parent component */
    	const forwardEvents = createEventForwarder(get_current_component());

    	function castRoot() {
    		return root;
    	}

    	let isHTMLElement = true;
    	let isComponent = false;

    	// @TODO
    	// Slot forwarding and conditional slots will be reworked for Svelte 5. This is waiting
    	// for that fix, since currently setting a slot and then checking for $$slot.icon
    	// for the `withIcon` class won't work.
    	// Discussion here: https://github.com/sveltejs/svelte/pull/8304 and
    	// https://github.com/sveltejs/svelte/issues/8765
    	let iconElement;

    	function onChange() {
    		// the 'this' keyword in this case is the
    		// HTML element provided in prop 'root'
    		$$invalidate(1, value = this.value);
    	}

    	function onInput(event) {
    		if (event.target.type === 'checkbox') {
    			$$invalidate(1, value = event.target.checked);
    		} else if (event.target.type === 'number' || event.target.type === 'range') {
    			$$invalidate(1, value = +event.target.value);
    		} else {
    			$$invalidate(1, value = event.target.value);
    		}
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	function svelte_element_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			element = $$value;
    			$$invalidate(0, element);
    		});
    	}

    	function switch_instance_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	function switch_instance_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(1, value);
    	}

    	function span_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			iconElement = $$value;
    			$$invalidate(21, iconElement);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(33, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(4, override = $$new_props.override);
    		if ('root' in $$new_props) $$invalidate(5, root = $$new_props.root);
    		if ('icon' in $$new_props) $$invalidate(6, icon = $$new_props.icon);
    		if ('iconWidth' in $$new_props) $$invalidate(34, iconWidth = $$new_props.iconWidth);
    		if ('iconProps' in $$new_props) $$invalidate(7, iconProps = $$new_props.iconProps);
    		if ('showRightSection' in $$new_props) $$invalidate(8, showRightSection = $$new_props.showRightSection);
    		if ('rightSectionWidth' in $$new_props) $$invalidate(35, rightSectionWidth = $$new_props.rightSectionWidth);
    		if ('rightSectionProps' in $$new_props) $$invalidate(9, rightSectionProps = $$new_props.rightSectionProps);
    		if ('wrapperProps' in $$new_props) $$invalidate(10, wrapperProps = $$new_props.wrapperProps);
    		if ('id' in $$new_props) $$invalidate(11, id = $$new_props.id);
    		if ('required' in $$new_props) $$invalidate(12, required = $$new_props.required);
    		if ('radius' in $$new_props) $$invalidate(36, radius = $$new_props.radius);
    		if ('variant' in $$new_props) $$invalidate(13, variant = $$new_props.variant);
    		if ('disabled' in $$new_props) $$invalidate(14, disabled = $$new_props.disabled);
    		if ('size' in $$new_props) $$invalidate(37, size = $$new_props.size);
    		if ('value' in $$new_props) $$invalidate(1, value = $$new_props.value);
    		if ('invalid' in $$new_props) $$invalidate(15, invalid = $$new_props.invalid);
    		if ('multiline' in $$new_props) $$invalidate(38, multiline = $$new_props.multiline);
    		if ('autocomplete' in $$new_props) $$invalidate(16, autocomplete = $$new_props.autocomplete);
    		if ('type' in $$new_props) $$invalidate(17, type = $$new_props.type);
    		if ('placeholder' in $$new_props) $$invalidate(18, placeholder = $$new_props.placeholder);
    		if ('autofocus' in $$new_props) $$invalidate(19, autofocus = $$new_props.autofocus);
    		if ('resize' in $$new_props) $$invalidate(39, resize = $$new_props.resize);
    		if ('noPointerEventsRightSection' in $$new_props) $$invalidate(20, noPointerEventsRightSection = $$new_props.noPointerEventsRightSection);
    		if ('$$scope' in $$new_props) $$invalidate(46, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		createEventForwarder,
    		useActions,
    		Box: Box$1,
    		IconRenderer: IconRenderer$1,
    		useStyles: useStyles$3,
    		use,
    		element,
    		className,
    		override,
    		root,
    		icon,
    		iconWidth,
    		iconProps,
    		showRightSection,
    		rightSectionWidth,
    		rightSectionProps,
    		wrapperProps,
    		id,
    		required,
    		radius,
    		variant,
    		disabled,
    		size,
    		value,
    		invalid,
    		multiline,
    		autocomplete,
    		type,
    		placeholder,
    		autofocus,
    		resize,
    		noPointerEventsRightSection,
    		forwardEvents,
    		castRoot,
    		isInput,
    		isHTMLElement,
    		isComponent,
    		iconElement,
    		onChange,
    		onInput,
    		getStyles,
    		classes,
    		cx,
    		isIconSlotUsed
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(4, override = $$new_props.override);
    		if ('root' in $$props) $$invalidate(5, root = $$new_props.root);
    		if ('icon' in $$props) $$invalidate(6, icon = $$new_props.icon);
    		if ('iconWidth' in $$props) $$invalidate(34, iconWidth = $$new_props.iconWidth);
    		if ('iconProps' in $$props) $$invalidate(7, iconProps = $$new_props.iconProps);
    		if ('showRightSection' in $$props) $$invalidate(8, showRightSection = $$new_props.showRightSection);
    		if ('rightSectionWidth' in $$props) $$invalidate(35, rightSectionWidth = $$new_props.rightSectionWidth);
    		if ('rightSectionProps' in $$props) $$invalidate(9, rightSectionProps = $$new_props.rightSectionProps);
    		if ('wrapperProps' in $$props) $$invalidate(10, wrapperProps = $$new_props.wrapperProps);
    		if ('id' in $$props) $$invalidate(11, id = $$new_props.id);
    		if ('required' in $$props) $$invalidate(12, required = $$new_props.required);
    		if ('radius' in $$props) $$invalidate(36, radius = $$new_props.radius);
    		if ('variant' in $$props) $$invalidate(13, variant = $$new_props.variant);
    		if ('disabled' in $$props) $$invalidate(14, disabled = $$new_props.disabled);
    		if ('size' in $$props) $$invalidate(37, size = $$new_props.size);
    		if ('value' in $$props) $$invalidate(1, value = $$new_props.value);
    		if ('invalid' in $$props) $$invalidate(15, invalid = $$new_props.invalid);
    		if ('multiline' in $$props) $$invalidate(38, multiline = $$new_props.multiline);
    		if ('autocomplete' in $$props) $$invalidate(16, autocomplete = $$new_props.autocomplete);
    		if ('type' in $$props) $$invalidate(17, type = $$new_props.type);
    		if ('placeholder' in $$props) $$invalidate(18, placeholder = $$new_props.placeholder);
    		if ('autofocus' in $$props) $$invalidate(19, autofocus = $$new_props.autofocus);
    		if ('resize' in $$props) $$invalidate(39, resize = $$new_props.resize);
    		if ('noPointerEventsRightSection' in $$props) $$invalidate(20, noPointerEventsRightSection = $$new_props.noPointerEventsRightSection);
    		if ('isHTMLElement' in $$props) $$invalidate(22, isHTMLElement = $$new_props.isHTMLElement);
    		if ('isComponent' in $$props) $$invalidate(23, isComponent = $$new_props.isComponent);
    		if ('iconElement' in $$props) $$invalidate(21, iconElement = $$new_props.iconElement);
    		if ('getStyles' in $$props) $$invalidate(24, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(25, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(26, cx = $$new_props.cx);
    		if ('isIconSlotUsed' in $$props) $$invalidate(27, isIconSlotUsed = $$new_props.isIconSlotUsed);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*iconElement*/ 2097152) {
    			$$invalidate(27, isIconSlotUsed = Boolean(iconElement?.innerHTML));
    		}

    		if ($$self.$$.dirty[0] & /*root*/ 32) {
    			{
    				$$invalidate(22, isHTMLElement = root && typeof root === 'string');
    				$$invalidate(23, isComponent = root && typeof root === 'function');
    			}
    		}

    		if ($$self.$$.dirty[0] & /*icon, invalid, showRightSection, variant*/ 41280 | $$self.$$.dirty[1] & /*iconWidth, multiline, radius, rightSectionWidth, size, resize*/ 504) {
    			$$invalidate(
    				26,
    				{ cx, classes, getStyles } = useStyles$3(
    					{
    						icon,
    						iconWidth,
    						invalid,
    						multiline,
    						radius,
    						rightSectionWidth,
    						showRightSection,
    						size,
    						resize,
    						variant
    					},
    					{ name: 'Input' }
    				),
    				cx,
    				(((((((((($$invalidate(25, classes), $$invalidate(6, icon)), $$invalidate(34, iconWidth)), $$invalidate(15, invalid)), $$invalidate(38, multiline)), $$invalidate(36, radius)), $$invalidate(35, rightSectionWidth)), $$invalidate(8, showRightSection)), $$invalidate(37, size)), $$invalidate(39, resize)), $$invalidate(13, variant)),
    				(((((((((($$invalidate(24, getStyles), $$invalidate(6, icon)), $$invalidate(34, iconWidth)), $$invalidate(15, invalid)), $$invalidate(38, multiline)), $$invalidate(36, radius)), $$invalidate(35, rightSectionWidth)), $$invalidate(8, showRightSection)), $$invalidate(37, size)), $$invalidate(39, resize)), $$invalidate(13, variant))
    			);
    		}
    	};

    	return [
    		element,
    		value,
    		use,
    		className,
    		override,
    		root,
    		icon,
    		iconProps,
    		showRightSection,
    		rightSectionProps,
    		wrapperProps,
    		id,
    		required,
    		variant,
    		disabled,
    		invalid,
    		autocomplete,
    		type,
    		placeholder,
    		autofocus,
    		noPointerEventsRightSection,
    		iconElement,
    		isHTMLElement,
    		isComponent,
    		getStyles,
    		classes,
    		cx,
    		isIconSlotUsed,
    		forwardEvents,
    		castRoot,
    		onChange,
    		onInput,
    		$$slots,
    		$$restProps,
    		iconWidth,
    		rightSectionWidth,
    		radius,
    		size,
    		multiline,
    		resize,
    		slots,
    		input_binding,
    		svelte_element_binding,
    		switch_instance_element_binding,
    		switch_instance_value_binding,
    		span_binding,
    		$$scope
    	];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$e,
    			create_fragment$e,
    			safe_not_equal,
    			{
    				use: 2,
    				element: 0,
    				class: 3,
    				override: 4,
    				root: 5,
    				icon: 6,
    				iconWidth: 34,
    				iconProps: 7,
    				showRightSection: 8,
    				rightSectionWidth: 35,
    				rightSectionProps: 9,
    				wrapperProps: 10,
    				id: 11,
    				required: 12,
    				radius: 36,
    				variant: 13,
    				disabled: 14,
    				size: 37,
    				value: 1,
    				invalid: 15,
    				multiline: 38,
    				autocomplete: 16,
    				type: 17,
    				placeholder: 18,
    				autofocus: 19,
    				resize: 39,
    				noPointerEventsRightSection: 20
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get use() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get root() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set root(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconWidth() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconWidth(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconProps() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconProps(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showRightSection() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showRightSection(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rightSectionWidth() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rightSectionWidth(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rightSectionProps() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rightSectionProps(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wrapperProps() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wrapperProps(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radius() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radius(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get variant() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set variant(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get multiline() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set multiline(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autocomplete() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autocomplete(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autofocus() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autofocus(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get resize() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set resize(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noPointerEventsRightSection() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noPointerEventsRightSection(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Input$1 = Input;

    /* ../node_modules/@svelteuidev/core/dist/components/TextInput/TextInput.svelte generated by Svelte v3.59.2 */
    const get_rightSection_slot_changes = dirty => ({});
    const get_rightSection_slot_context = ctx => ({ slot: "rightSection" });
    const get_icon_slot_changes = dirty => ({});
    const get_icon_slot_context = ctx => ({ slot: "icon" });

    // (65:2) 
    function create_rightSection_slot(ctx) {
    	let current;
    	const rightSection_slot_template = /*#slots*/ ctx[22].rightSection;
    	const rightSection_slot = create_slot(rightSection_slot_template, ctx, /*$$scope*/ ctx[25], get_rightSection_slot_context);

    	const block = {
    		c: function create() {
    			if (rightSection_slot) rightSection_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (rightSection_slot) {
    				rightSection_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (rightSection_slot) {
    				if (rightSection_slot.p && (!current || dirty & /*$$scope*/ 33554432)) {
    					update_slot_base(
    						rightSection_slot,
    						rightSection_slot_template,
    						ctx,
    						/*$$scope*/ ctx[25],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
    						: get_slot_changes(rightSection_slot_template, /*$$scope*/ ctx[25], dirty, get_rightSection_slot_changes),
    						get_rightSection_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(rightSection_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(rightSection_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (rightSection_slot) rightSection_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_rightSection_slot.name,
    		type: "slot",
    		source: "(65:2) ",
    		ctx
    	});

    	return block;
    }

    // (66:2) 
    function create_icon_slot(ctx) {
    	let current;
    	const icon_slot_template = /*#slots*/ ctx[22].icon;
    	const icon_slot = create_slot(icon_slot_template, ctx, /*$$scope*/ ctx[25], get_icon_slot_context);

    	const block = {
    		c: function create() {
    			if (icon_slot) icon_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (icon_slot) {
    				icon_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (icon_slot) {
    				if (icon_slot.p && (!current || dirty & /*$$scope*/ 33554432)) {
    					update_slot_base(
    						icon_slot,
    						icon_slot_template,
    						ctx,
    						/*$$scope*/ ctx[25],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
    						: get_slot_changes(icon_slot_template, /*$$scope*/ ctx[25], dirty, get_icon_slot_changes),
    						get_icon_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (icon_slot) icon_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_icon_slot.name,
    		type: "slot",
    		source: "(66:2) ",
    		ctx
    	});

    	return block;
    }

    // (39:0) <InputWrapper  bind:element  class={className}  {override}  {label}  {description}  {error}  {required}  {labelProps}  {descriptionProps}  {errorProps}  {id}  {labelElement}  {size} >
    function create_default_slot$a(ctx) {
    	let input;
    	let updating_value;
    	let current;

    	const input_spread_levels = [
    		{ required: /*required*/ ctx[8] },
    		{ size: /*size*/ ctx[14] },
    		{ id: /*id*/ ctx[12] },
    		{ placeholder: /*placeholder*/ ctx[15] },
    		/*$$restProps*/ ctx[19],
    		{
    			use: [/*forwardEvents*/ ctx[17], [useActions, /*use*/ ctx[2]]]
    		},
    		{ invalid: /*_invalid*/ ctx[16] },
    		{
    			showRightSection: /*_showRightSection*/ ctx[18]
    		}
    	];

    	function input_value_binding(value) {
    		/*input_value_binding*/ ctx[23](value);
    	}

    	let input_props = {
    		$$slots: {
    			icon: [create_icon_slot],
    			rightSection: [create_rightSection_slot]
    		},
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < input_spread_levels.length; i += 1) {
    		input_props = assign(input_props, input_spread_levels[i]);
    	}

    	if (/*value*/ ctx[1] !== void 0) {
    		input_props.value = /*value*/ ctx[1];
    	}

    	input = new Input$1({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, 'value', input_value_binding));

    	const block = {
    		c: function create() {
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const input_changes = (dirty & /*required, size, id, placeholder, $$restProps, forwardEvents, useActions, use, _invalid, _showRightSection*/ 1036548)
    			? get_spread_update(input_spread_levels, [
    					dirty & /*required*/ 256 && { required: /*required*/ ctx[8] },
    					dirty & /*size*/ 16384 && { size: /*size*/ ctx[14] },
    					dirty & /*id*/ 4096 && { id: /*id*/ ctx[12] },
    					dirty & /*placeholder*/ 32768 && { placeholder: /*placeholder*/ ctx[15] },
    					dirty & /*$$restProps*/ 524288 && get_spread_object(/*$$restProps*/ ctx[19]),
    					dirty & /*forwardEvents, useActions, use*/ 131076 && {
    						use: [/*forwardEvents*/ ctx[17], [useActions, /*use*/ ctx[2]]]
    					},
    					dirty & /*_invalid*/ 65536 && { invalid: /*_invalid*/ ctx[16] },
    					dirty & /*_showRightSection*/ 262144 && {
    						showRightSection: /*_showRightSection*/ ctx[18]
    					}
    				])
    			: {};

    			if (dirty & /*$$scope*/ 33554432) {
    				input_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty & /*value*/ 2) {
    				updating_value = true;
    				input_changes.value = /*value*/ ctx[1];
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$a.name,
    		type: "slot",
    		source: "(39:0) <InputWrapper  bind:element  class={className}  {override}  {label}  {description}  {error}  {required}  {labelProps}  {descriptionProps}  {errorProps}  {id}  {labelElement}  {size} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let inputwrapper;
    	let updating_element;
    	let current;

    	function inputwrapper_element_binding(value) {
    		/*inputwrapper_element_binding*/ ctx[24](value);
    	}

    	let inputwrapper_props = {
    		class: /*className*/ ctx[3],
    		override: /*override*/ ctx[4],
    		label: /*label*/ ctx[5],
    		description: /*description*/ ctx[6],
    		error: /*error*/ ctx[7],
    		required: /*required*/ ctx[8],
    		labelProps: /*labelProps*/ ctx[9],
    		descriptionProps: /*descriptionProps*/ ctx[10],
    		errorProps: /*errorProps*/ ctx[11],
    		id: /*id*/ ctx[12],
    		labelElement: /*labelElement*/ ctx[13],
    		size: /*size*/ ctx[14],
    		$$slots: { default: [create_default_slot$a] },
    		$$scope: { ctx }
    	};

    	if (/*element*/ ctx[0] !== void 0) {
    		inputwrapper_props.element = /*element*/ ctx[0];
    	}

    	inputwrapper = new InputWrapper$1({
    			props: inputwrapper_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(inputwrapper, 'element', inputwrapper_element_binding));

    	const block = {
    		c: function create() {
    			create_component(inputwrapper.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(inputwrapper, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const inputwrapper_changes = {};
    			if (dirty & /*className*/ 8) inputwrapper_changes.class = /*className*/ ctx[3];
    			if (dirty & /*override*/ 16) inputwrapper_changes.override = /*override*/ ctx[4];
    			if (dirty & /*label*/ 32) inputwrapper_changes.label = /*label*/ ctx[5];
    			if (dirty & /*description*/ 64) inputwrapper_changes.description = /*description*/ ctx[6];
    			if (dirty & /*error*/ 128) inputwrapper_changes.error = /*error*/ ctx[7];
    			if (dirty & /*required*/ 256) inputwrapper_changes.required = /*required*/ ctx[8];
    			if (dirty & /*labelProps*/ 512) inputwrapper_changes.labelProps = /*labelProps*/ ctx[9];
    			if (dirty & /*descriptionProps*/ 1024) inputwrapper_changes.descriptionProps = /*descriptionProps*/ ctx[10];
    			if (dirty & /*errorProps*/ 2048) inputwrapper_changes.errorProps = /*errorProps*/ ctx[11];
    			if (dirty & /*id*/ 4096) inputwrapper_changes.id = /*id*/ ctx[12];
    			if (dirty & /*labelElement*/ 8192) inputwrapper_changes.labelElement = /*labelElement*/ ctx[13];
    			if (dirty & /*size*/ 16384) inputwrapper_changes.size = /*size*/ ctx[14];

    			if (dirty & /*$$scope, required, size, id, placeholder, $$restProps, use, _invalid, value*/ 34197766) {
    				inputwrapper_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				inputwrapper_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			inputwrapper.$set(inputwrapper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inputwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inputwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inputwrapper, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let _invalid;

    	const omit_props_names = [
    		"use","element","class","override","label","description","error","required","labelProps","descriptionProps","errorProps","invalid","id","labelElement","size","showRightSection","value","placeholder"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextInput', slots, ['icon','rightSection']);
    	const $$slots = compute_slots(slots);
    	let { use = [], element = undefined, class: className = '', override = {}, label = '', description = null, error = null, required = false, labelProps = {}, descriptionProps = {}, errorProps = {}, invalid = false, id = randomID('text-input'), labelElement = 'label', size = 'sm', showRightSection = undefined, value = '', placeholder = '' } = $$props;

    	/** An action that forwards inner dom node events from parent component */
    	const forwardEvents = createEventForwarder(get_current_component());

    	// Flag that enables the override of the right section slot
    	// of the Input component only if it was provided
    	const _showRightSection = showRightSection === undefined
    	? !!$$slots.rightSection
    	: showRightSection;

    	function input_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(1, value);
    	}

    	function inputwrapper_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(19, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(4, override = $$new_props.override);
    		if ('label' in $$new_props) $$invalidate(5, label = $$new_props.label);
    		if ('description' in $$new_props) $$invalidate(6, description = $$new_props.description);
    		if ('error' in $$new_props) $$invalidate(7, error = $$new_props.error);
    		if ('required' in $$new_props) $$invalidate(8, required = $$new_props.required);
    		if ('labelProps' in $$new_props) $$invalidate(9, labelProps = $$new_props.labelProps);
    		if ('descriptionProps' in $$new_props) $$invalidate(10, descriptionProps = $$new_props.descriptionProps);
    		if ('errorProps' in $$new_props) $$invalidate(11, errorProps = $$new_props.errorProps);
    		if ('invalid' in $$new_props) $$invalidate(20, invalid = $$new_props.invalid);
    		if ('id' in $$new_props) $$invalidate(12, id = $$new_props.id);
    		if ('labelElement' in $$new_props) $$invalidate(13, labelElement = $$new_props.labelElement);
    		if ('size' in $$new_props) $$invalidate(14, size = $$new_props.size);
    		if ('showRightSection' in $$new_props) $$invalidate(21, showRightSection = $$new_props.showRightSection);
    		if ('value' in $$new_props) $$invalidate(1, value = $$new_props.value);
    		if ('placeholder' in $$new_props) $$invalidate(15, placeholder = $$new_props.placeholder);
    		if ('$$scope' in $$new_props) $$invalidate(25, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		get_current_component,
    		createEventForwarder,
    		useActions,
    		randomID,
    		Input: Input$1,
    		InputWrapper: InputWrapper$1,
    		use,
    		element,
    		className,
    		override,
    		label,
    		description,
    		error,
    		required,
    		labelProps,
    		descriptionProps,
    		errorProps,
    		invalid,
    		id,
    		labelElement,
    		size,
    		showRightSection,
    		value,
    		placeholder,
    		forwardEvents,
    		_showRightSection,
    		_invalid
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(4, override = $$new_props.override);
    		if ('label' in $$props) $$invalidate(5, label = $$new_props.label);
    		if ('description' in $$props) $$invalidate(6, description = $$new_props.description);
    		if ('error' in $$props) $$invalidate(7, error = $$new_props.error);
    		if ('required' in $$props) $$invalidate(8, required = $$new_props.required);
    		if ('labelProps' in $$props) $$invalidate(9, labelProps = $$new_props.labelProps);
    		if ('descriptionProps' in $$props) $$invalidate(10, descriptionProps = $$new_props.descriptionProps);
    		if ('errorProps' in $$props) $$invalidate(11, errorProps = $$new_props.errorProps);
    		if ('invalid' in $$props) $$invalidate(20, invalid = $$new_props.invalid);
    		if ('id' in $$props) $$invalidate(12, id = $$new_props.id);
    		if ('labelElement' in $$props) $$invalidate(13, labelElement = $$new_props.labelElement);
    		if ('size' in $$props) $$invalidate(14, size = $$new_props.size);
    		if ('showRightSection' in $$props) $$invalidate(21, showRightSection = $$new_props.showRightSection);
    		if ('value' in $$props) $$invalidate(1, value = $$new_props.value);
    		if ('placeholder' in $$props) $$invalidate(15, placeholder = $$new_props.placeholder);
    		if ('_invalid' in $$props) $$invalidate(16, _invalid = $$new_props._invalid);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*invalid, error*/ 1048704) {
    			$$invalidate(16, _invalid = invalid || !!error);
    		}
    	};

    	return [
    		element,
    		value,
    		use,
    		className,
    		override,
    		label,
    		description,
    		error,
    		required,
    		labelProps,
    		descriptionProps,
    		errorProps,
    		id,
    		labelElement,
    		size,
    		placeholder,
    		_invalid,
    		forwardEvents,
    		_showRightSection,
    		$$restProps,
    		invalid,
    		showRightSection,
    		slots,
    		input_value_binding,
    		inputwrapper_element_binding,
    		$$scope
    	];
    }

    class TextInput extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
    			use: 2,
    			element: 0,
    			class: 3,
    			override: 4,
    			label: 5,
    			description: 6,
    			error: 7,
    			required: 8,
    			labelProps: 9,
    			descriptionProps: 10,
    			errorProps: 11,
    			invalid: 20,
    			id: 12,
    			labelElement: 13,
    			size: 14,
    			showRightSection: 21,
    			value: 1,
    			placeholder: 15
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextInput",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get use() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get error() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set error(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelProps() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelProps(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get descriptionProps() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set descriptionProps(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get errorProps() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set errorProps(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelElement() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelElement(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showRightSection() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showRightSection(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var TextInput$1 = TextInput;

    function getCumulativeSections(sections) {
        return sections.reduce((acc, section) => {
            acc.sections.push({ ...section, accumulated: acc.accumulated });
            acc.accumulated += section.value;
            return acc;
        }, { accumulated: 0, sections: [] }).sections;
    }
    const sizes$1 = {
        xs: 3,
        sm: 5,
        md: 8,
        lg: 12,
        xl: 16
    };
    const stripesAnimation = keyframes({
        from: { backgroundPosition: '0 0' },
        to: { backgroundPosition: '40px 0' }
    });
    var useStyles$2 = createStyles((theme, { color, radius, size, striped, animate, shade }) => ({
        root: {
            [`${theme.dark} &`]: {
                backgroundColor: theme.fn.themeColor('dark', 4)
            },
            position: 'relative',
            height: theme.fn.size({ size, sizes: sizes$1 }),
            backgroundColor: theme.fn.themeColor('gray', 2),
            borderRadius: theme.fn.radius(radius),
            overflow: 'hidden'
        },
        bar: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.fn.themeColor(color || 'blue', shade),
            transition: 'width 100ms linear',
            animation: animate ? `${stripesAnimation} 1000ms linear infinite` : 'none',
            backgroundSize: '20px 20px',
            backgroundImage: striped
                ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)'
                : 'none',
            '&:last-of-type': {
                borderTopRightRadius: theme.fn.radius(radius),
                borderBottomRightRadius: theme.fn.radius(radius)
            },
            '&:first-of-type': {
                borderTopLeftRadius: theme.fn.radius(radius),
                borderBottomLeftRadius: theme.fn.radius(radius)
            },
            '@media (prefers-reduced-motion)': {
                transitionDuration: '0ms'
            }
        },
        label: {
            color: theme.colors.white.value,
            fontSize: theme.fn.size({ size, sizes: sizes$1 }) * 0.65,
            fontWeight: 700,
            userSelect: 'none',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        }
    }));

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function get_interpolator(a, b) {
        if (a === b || a !== a)
            return () => a;
        const type = typeof a;
        if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
            throw new Error('Cannot interpolate values of different type');
        }
        if (Array.isArray(a)) {
            const arr = b.map((bi, i) => {
                return get_interpolator(a[i], bi);
            });
            return t => arr.map(fn => fn(t));
        }
        if (type === 'object') {
            if (!a || !b)
                throw new Error('Object cannot be null');
            if (is_date(a) && is_date(b)) {
                a = a.getTime();
                b = b.getTime();
                const delta = b - a;
                return t => new Date(a + t * delta);
            }
            const keys = Object.keys(b);
            const interpolators = {};
            keys.forEach(key => {
                interpolators[key] = get_interpolator(a[key], b[key]);
            });
            return t => {
                const result = {};
                keys.forEach(key => {
                    result[key] = interpolators[key](t);
                });
                return result;
            };
        }
        if (type === 'number') {
            const delta = b - a;
            return t => a + t * delta;
        }
        throw new Error(`Cannot interpolate ${type} values`);
    }
    function tweened(value, defaults = {}) {
        const store = writable(value);
        let task;
        let target_value = value;
        function set(new_value, opts) {
            if (value == null) {
                store.set(value = new_value);
                return Promise.resolve();
            }
            target_value = new_value;
            let previous_task = task;
            let started = false;
            let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
            if (duration === 0) {
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                store.set(value = target_value);
                return Promise.resolve();
            }
            const start = now() + delay;
            let fn;
            task = loop(now => {
                if (now < start)
                    return true;
                if (!started) {
                    fn = interpolate(value, new_value);
                    if (typeof duration === 'function')
                        duration = duration(value, new_value);
                    started = true;
                }
                if (previous_task) {
                    previous_task.abort();
                    previous_task = null;
                }
                const elapsed = now - start;
                if (elapsed > duration) {
                    store.set(value = new_value);
                    return false;
                }
                // @ts-ignore
                store.set(value = fn(easing(elapsed / duration)));
                return true;
            });
            return task.promise;
        }
        return {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe
        };
    }

    /* ../node_modules/@svelteuidev/core/dist/components/Progress/Progress.svelte generated by Svelte v3.59.2 */
    const file$9 = "../node_modules/@svelteuidev/core/dist/components/Progress/Progress.svelte";
    const get_label_slot_changes = dirty => ({});
    const get_label_slot_context = ctx => ({});

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[28] = list[i];
    	return child_ctx;
    }

    // (39:1) {:else}
    function create_else_block$6(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let div_class_value;
    	let div_style_value;
    	let current;
    	const if_block_creators = [create_if_block_2$2, create_if_block_3$2];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*$$slots*/ ctx[17].label) return 0;
    		if (/*label*/ ctx[5]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type_1(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", div_class_value = /*classes*/ ctx[12].bar);
    			attr_dev(div, "role", "progressbar");
    			attr_dev(div, "aria-valuemax", 100);
    			attr_dev(div, "aria-valuemin", 0);
    			attr_dev(div, "aria-valuenow", /*value*/ ctx[4]);
    			attr_dev(div, "aria-label", /*ariaLabel*/ ctx[8]);

    			attr_dev(div, "style", div_style_value = `width:${/*tween*/ ctx[9]
			? /*$progress*/ ctx[15]
			: /*value*/ ctx[4]}%`);

    			add_location(div, file$9, 39, 2, 1509);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				} else {
    					if_block = null;
    				}
    			}

    			if (!current || dirty & /*classes*/ 4096 && div_class_value !== (div_class_value = /*classes*/ ctx[12].bar)) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*value*/ 16) {
    				attr_dev(div, "aria-valuenow", /*value*/ ctx[4]);
    			}

    			if (!current || dirty & /*ariaLabel*/ 256) {
    				attr_dev(div, "aria-label", /*ariaLabel*/ ctx[8]);
    			}

    			if (!current || dirty & /*tween, $progress, value*/ 33296 && div_style_value !== (div_style_value = `width:${/*tween*/ ctx[9]
			? /*$progress*/ ctx[15]
			: /*value*/ ctx[4]}%`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(39:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (24:1) {#if segments}
    function create_if_block$8(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = getCumulativeSections(/*sections*/ ctx[6]);
    	validate_each_argument(each_value);
    	const get_key = ctx => /*section*/ ctx[28];
    	validate_each_keys(ctx, each_value, get_each_context$4, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$4(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$4(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*classes, tween, $progress, getCumulativeSections, sections, theme, shade*/ 38592) {
    				each_value = getCumulativeSections(/*sections*/ ctx[6]);
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$4, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$4, each_1_anchor, get_each_context$4);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(24:1) {#if segments}",
    		ctx
    	});

    	return block;
    }

    // (51:19) 
    function create_if_block_3$2(ctx) {
    	let text_1;
    	let current;

    	text_1 = new Text$1({
    			props: {
    				class: /*classes*/ ctx[12].label,
    				$$slots: { default: [create_default_slot_3$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(text_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(text_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};
    			if (dirty & /*classes*/ 4096) text_1_changes.class = /*classes*/ ctx[12].label;

    			if (dirty & /*$$scope, label*/ 67108896) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(text_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$2.name,
    		type: "if",
    		source: "(51:19) ",
    		ctx
    	});

    	return block;
    }

    // (49:3) {#if $$slots.label}
    function create_if_block_2$2(ctx) {
    	let current;
    	const label_slot_template = /*#slots*/ ctx[24].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[26], get_label_slot_context);

    	const block = {
    		c: function create() {
    			if (label_slot) label_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (label_slot) {
    				label_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (label_slot) {
    				if (label_slot.p && (!current || dirty & /*$$scope*/ 67108864)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[26],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[26])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[26], dirty, get_label_slot_changes),
    						get_label_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (label_slot) label_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(49:3) {#if $$slots.label}",
    		ctx
    	});

    	return block;
    }

    // (52:4) <Text class={classes.label}>
    function create_default_slot_3$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*label*/ ctx[5]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 32) set_data_dev(t, /*label*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$5.name,
    		type: "slot",
    		source: "(52:4) <Text class={classes.label}>",
    		ctx
    	});

    	return block;
    }

    // (34:4) {#if section.label}
    function create_if_block_1$4(ctx) {
    	let text_1;
    	let current;

    	text_1 = new Text$1({
    			props: {
    				class: /*classes*/ ctx[12].label,
    				$$slots: { default: [create_default_slot_2$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(text_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(text_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};
    			if (dirty & /*classes*/ 4096) text_1_changes.class = /*classes*/ ctx[12].label;

    			if (dirty & /*$$scope, sections*/ 67108928) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(text_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(34:4) {#if section.label}",
    		ctx
    	});

    	return block;
    }

    // (35:5) <Text class={classes.label}>
    function create_default_slot_2$5(ctx) {
    	let t_value = /*section*/ ctx[28].label + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sections*/ 64 && t_value !== (t_value = /*section*/ ctx[28].label + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$5.name,
    		type: "slot",
    		source: "(35:5) <Text class={classes.label}>",
    		ctx
    	});

    	return block;
    }

    // (26:3) <Box     class={classes.bar}     css={{      width: `${tween ? $progress : section.value}% !important`,      left: `${section.accumulated}% !important`,      backgroundColor: `${theme.fn.themeColor(section.color, shade)} !important`     }}    >
    function create_default_slot_1$6(ctx) {
    	let t;
    	let current;
    	let if_block = /*section*/ ctx[28].label && create_if_block_1$4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*section*/ ctx[28].label) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*sections*/ 64) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t.parentNode, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$6.name,
    		type: "slot",
    		source: "(26:3) <Box     class={classes.bar}     css={{      width: `${tween ? $progress : section.value}% !important`,      left: `${section.accumulated}% !important`,      backgroundColor: `${theme.fn.themeColor(section.color, shade)} !important`     }}    >",
    		ctx
    	});

    	return block;
    }

    // (25:2) {#each getCumulativeSections(sections) as section (section)}
    function create_each_block$4(key_1, ctx) {
    	let first;
    	let box;
    	let current;

    	box = new Box$1({
    			props: {
    				class: /*classes*/ ctx[12].bar,
    				css: {
    					width: `${/*tween*/ ctx[9]
					? /*$progress*/ ctx[15]
					: /*section*/ ctx[28].value}% !important`,
    					left: `${/*section*/ ctx[28].accumulated}% !important`,
    					backgroundColor: `${/*theme*/ ctx[10].fn.themeColor(/*section*/ ctx[28].color, /*shade*/ ctx[7])} !important`
    				},
    				$$slots: { default: [create_default_slot_1$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(box.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const box_changes = {};
    			if (dirty & /*classes*/ 4096) box_changes.class = /*classes*/ ctx[12].bar;

    			if (dirty & /*tween, $progress, sections, theme, shade*/ 34496) box_changes.css = {
    				width: `${/*tween*/ ctx[9]
				? /*$progress*/ ctx[15]
				: /*section*/ ctx[28].value}% !important`,
    				left: `${/*section*/ ctx[28].accumulated}% !important`,
    				backgroundColor: `${/*theme*/ ctx[10].fn.themeColor(/*section*/ ctx[28].color, /*shade*/ ctx[7])} !important`
    			};

    			if (dirty & /*$$scope, classes, sections*/ 67113024) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(25:2) {#each getCumulativeSections(sections) as section (section)}",
    		ctx
    	});

    	return block;
    }

    // (23:0) <Box bind:element {use} class={cx(className, classes.root, getStyles({ css: override }))}>
    function create_default_slot$9(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$8, create_else_block$6];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*segments*/ ctx[14]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$9.name,
    		type: "slot",
    		source: "(23:0) <Box bind:element {use} class={cx(className, classes.root, getStyles({ css: override }))}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[25](value);
    	}

    	let box_props = {
    		use: /*use*/ ctx[1],
    		class: /*cx*/ ctx[13](/*className*/ ctx[2], /*classes*/ ctx[12].root, /*getStyles*/ ctx[11]({ css: /*override*/ ctx[3] })),
    		$$slots: { default: [create_default_slot$9] },
    		$$scope: { ctx }
    	};

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = {};
    			if (dirty & /*use*/ 2) box_changes.use = /*use*/ ctx[1];
    			if (dirty & /*cx, className, classes, getStyles, override*/ 14348) box_changes.class = /*cx*/ ctx[13](/*className*/ ctx[2], /*classes*/ ctx[12].root, /*getStyles*/ ctx[11]({ css: /*override*/ ctx[3] }));

    			if (dirty & /*$$scope, sections, classes, tween, $progress, theme, shade, segments, value, ariaLabel, $$slots, label*/ 67295216) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let segments;
    	let cx;
    	let classes;
    	let getStyles;
    	let theme;
    	let $progress;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Progress', slots, ['label']);
    	const $$slots = compute_slots(slots);
    	let { use = [], element = undefined, class: className = '', override = {}, value = undefined, color = undefined, size = 'md', radius = 'sm', striped = false, animate = false, label = '', sections = undefined, shade = 6, ariaLabel = randomID(), tween = false, tweenOptions = {} } = $$props;

    	const defaultTweenOptions = {
    		delay: 0,
    		duration: 400,
    		easing: cubicOut
    	};

    	const progress = tweened(undefined, { ...defaultTweenOptions, ...tweenOptions });
    	validate_store(progress, 'progress');
    	component_subscribe($$self, progress, value => $$invalidate(15, $progress = value));

    	const writable_props = [
    		'use',
    		'element',
    		'class',
    		'override',
    		'value',
    		'color',
    		'size',
    		'radius',
    		'striped',
    		'animate',
    		'label',
    		'sections',
    		'shade',
    		'ariaLabel',
    		'tween',
    		'tweenOptions'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Progress> was created with unknown prop '${key}'`);
    	});

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$props => {
    		if ('use' in $$props) $$invalidate(1, use = $$props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$props.element);
    		if ('class' in $$props) $$invalidate(2, className = $$props.class);
    		if ('override' in $$props) $$invalidate(3, override = $$props.override);
    		if ('value' in $$props) $$invalidate(4, value = $$props.value);
    		if ('color' in $$props) $$invalidate(18, color = $$props.color);
    		if ('size' in $$props) $$invalidate(19, size = $$props.size);
    		if ('radius' in $$props) $$invalidate(20, radius = $$props.radius);
    		if ('striped' in $$props) $$invalidate(21, striped = $$props.striped);
    		if ('animate' in $$props) $$invalidate(22, animate = $$props.animate);
    		if ('label' in $$props) $$invalidate(5, label = $$props.label);
    		if ('sections' in $$props) $$invalidate(6, sections = $$props.sections);
    		if ('shade' in $$props) $$invalidate(7, shade = $$props.shade);
    		if ('ariaLabel' in $$props) $$invalidate(8, ariaLabel = $$props.ariaLabel);
    		if ('tween' in $$props) $$invalidate(9, tween = $$props.tween);
    		if ('tweenOptions' in $$props) $$invalidate(23, tweenOptions = $$props.tweenOptions);
    		if ('$$scope' in $$props) $$invalidate(26, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		useStyles: useStyles$2,
    		getCumulativeSections,
    		tweened,
    		Box: Box$1,
    		Text: Text$1,
    		randomID,
    		cubicOut,
    		use,
    		element,
    		className,
    		override,
    		value,
    		color,
    		size,
    		radius,
    		striped,
    		animate,
    		label,
    		sections,
    		shade,
    		ariaLabel,
    		tween,
    		tweenOptions,
    		defaultTweenOptions,
    		progress,
    		theme,
    		getStyles,
    		classes,
    		cx,
    		segments,
    		$progress
    	});

    	$$self.$inject_state = $$props => {
    		if ('use' in $$props) $$invalidate(1, use = $$props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$props.override);
    		if ('value' in $$props) $$invalidate(4, value = $$props.value);
    		if ('color' in $$props) $$invalidate(18, color = $$props.color);
    		if ('size' in $$props) $$invalidate(19, size = $$props.size);
    		if ('radius' in $$props) $$invalidate(20, radius = $$props.radius);
    		if ('striped' in $$props) $$invalidate(21, striped = $$props.striped);
    		if ('animate' in $$props) $$invalidate(22, animate = $$props.animate);
    		if ('label' in $$props) $$invalidate(5, label = $$props.label);
    		if ('sections' in $$props) $$invalidate(6, sections = $$props.sections);
    		if ('shade' in $$props) $$invalidate(7, shade = $$props.shade);
    		if ('ariaLabel' in $$props) $$invalidate(8, ariaLabel = $$props.ariaLabel);
    		if ('tween' in $$props) $$invalidate(9, tween = $$props.tween);
    		if ('tweenOptions' in $$props) $$invalidate(23, tweenOptions = $$props.tweenOptions);
    		if ('theme' in $$props) $$invalidate(10, theme = $$props.theme);
    		if ('getStyles' in $$props) $$invalidate(11, getStyles = $$props.getStyles);
    		if ('classes' in $$props) $$invalidate(12, classes = $$props.classes);
    		if ('cx' in $$props) $$invalidate(13, cx = $$props.cx);
    		if ('segments' in $$props) $$invalidate(14, segments = $$props.segments);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*sections*/ 64) {
    			$$invalidate(14, segments = Array.isArray(sections));
    		}

    		if ($$self.$$.dirty & /*value*/ 16) {
    			progress.set(value);
    		}

    		if ($$self.$$.dirty & /*animate, color, radius, size, shade, striped*/ 8126592) {
    			$$invalidate(
    				13,
    				{ cx, classes, getStyles, theme } = useStyles$2(
    					{
    						animate,
    						color,
    						radius,
    						size,
    						shade,
    						striped: striped || animate
    					},
    					{ name: 'Progress' }
    				),
    				cx,
    				(((((($$invalidate(12, classes), $$invalidate(22, animate)), $$invalidate(18, color)), $$invalidate(20, radius)), $$invalidate(19, size)), $$invalidate(7, shade)), $$invalidate(21, striped)),
    				(((((($$invalidate(11, getStyles), $$invalidate(22, animate)), $$invalidate(18, color)), $$invalidate(20, radius)), $$invalidate(19, size)), $$invalidate(7, shade)), $$invalidate(21, striped)),
    				(((((($$invalidate(10, theme), $$invalidate(22, animate)), $$invalidate(18, color)), $$invalidate(20, radius)), $$invalidate(19, size)), $$invalidate(7, shade)), $$invalidate(21, striped))
    			);
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		value,
    		label,
    		sections,
    		shade,
    		ariaLabel,
    		tween,
    		theme,
    		getStyles,
    		classes,
    		cx,
    		segments,
    		$progress,
    		progress,
    		$$slots,
    		color,
    		size,
    		radius,
    		striped,
    		animate,
    		tweenOptions,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class Progress extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			value: 4,
    			color: 18,
    			size: 19,
    			radius: 20,
    			striped: 21,
    			animate: 22,
    			label: 5,
    			sections: 6,
    			shade: 7,
    			ariaLabel: 8,
    			tween: 9,
    			tweenOptions: 23
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Progress",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get use() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radius() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radius(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get striped() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set striped(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get animate() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set animate(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sections() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sections(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shade() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set shade(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabel() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tween() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tween(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tweenOptions() {
    		throw new Error("<Progress>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tweenOptions(value) {
    		throw new Error("<Progress>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Progress$1 = Progress;

    const sizes = {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 30,
        xl: 36
    };
    const innerSizes = {
        xs: 6,
        sm: 8,
        md: 10,
        lg: 14,
        xl: 16
    };
    const padding = {
        xs: 5,
        sm: 8,
        md: 10,
        lg: 11,
        xl: 12
    };
    var useStyles$1 = createStyles((theme, { color, size, labelDirection, error }, getRef) => {
        return {
            root: {
                display: 'flex'
            },
            container: {
                display: 'flex',
                flexDirection: labelDirection === 'left' ? 'row' : 'row-reverse',
                alignItems: 'center'
            },
            inputContainer: {
                position: 'relative'
            },
            input: {
                border: `1px solid ${error
                ? theme.fn.variant({ variant: 'filled', color: 'red' }).background
                : theme.fn.themeColor('gray', 4)}`,
                position: 'relative',
                appearance: 'none',
                width: theme.fn.size({ sizes, size }),
                height: theme.fn.size({ sizes, size }),
                borderRadius: theme.fn.size({ sizes, size }),
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: theme.colors.white.value,
                darkMode: {
                    backgroundColor: theme.fn.themeColor('dark', 6),
                    border: `1px solid ${error
                    ? theme.fn.variant({ variant: 'filled', color: 'red' }).background
                    : theme.fn.themeColor('dark', 4)}`
                },
                '&:checked': {
                    background: theme.fn.variant({ variant: 'filled', color }).background[1],
                    borderColor: theme.fn.variant({ variant: 'filled', color }).background[1],
                    [`& + .${getRef('inner')}`]: {
                        opacity: 1,
                        transform: 'scale(1)'
                    }
                },
                '&.disabled': {
                    backgroundColor: theme.fn.themeColor('gray', 1),
                    borderColor: theme.fn.themeColor('gray', 4),
                    darkMode: {
                        backgroundColor: theme.fn.themeColor('dark', 5),
                        borderColor: theme.fn.themeColor('dark', 5)
                    },
                    [`& + .${getRef('inner')}`]: {
                        color: theme.fn.themeColor('gray', 4),
                        darkMode: {
                            color: theme.fn.themeColor('dark', 6)
                        }
                    }
                }
            },
            inner: {
                ref: getRef('inner'),
                backgroundColor: theme.colors.white.value,
                borderRadius: '100%',
                opacity: 0,
                transform: 'scale(0.75) translateY(2px)',
                pointerEvents: 'none',
                width: theme.fn.size({ sizes: innerSizes, size }),
                height: theme.fn.size({ sizes: innerSizes, size }),
                position: 'absolute',
                top: `calc(50% - ${theme.fn.size({ sizes: innerSizes, size }) / 2}px)`,
                left: `calc(50% - ${theme.fn.size({ sizes: innerSizes, size }) / 2}px)`
            },
            label: {
                fontSize: theme.fontSizes[size].value,
                marginLeft: labelDirection == 'left' ? `${theme.fn.size({ size, sizes: padding })}px` : 0,
                marginRight: labelDirection == 'right' ? `${theme.fn.size({ size, sizes: padding })}px` : 0,
                '&.disabled': {
                    color: theme.fn.themeColor('gray', 5)
                }
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/Radio/Radio.svelte generated by Svelte v3.59.2 */
    const file$8 = "../node_modules/@svelteuidev/core/dist/components/Radio/Radio.svelte";

    // (50:3) {:else}
    function create_else_block$5(ctx) {
    	let input;
    	let input_class_value;
    	let useActions_action;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		{
    			class: input_class_value = /*classes*/ ctx[12].input
    		},
    		{ type: "radio" },
    		{ checked: /*checked*/ ctx[1] },
    		{ name: /*name*/ ctx[10] },
    		{ disabled: /*disabled*/ ctx[7] },
    		{ value: /*value*/ ctx[8] },
    		{ id: /*id*/ ctx[6] },
    		/*$$restProps*/ ctx[16]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			toggle_class(input, "disabled", /*disabled*/ ctx[7]);
    			add_location(input, file$8, 50, 4, 1543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*onChange*/ ctx[15], false, false, false, false),
    					action_destroyer(useActions_action = useActions.call(null, input, /*use*/ ctx[3])),
    					action_destroyer(/*forwardEvents*/ ctx[14].call(null, input))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty & /*classes*/ 4096 && input_class_value !== (input_class_value = /*classes*/ ctx[12].input) && { class: input_class_value },
    				{ type: "radio" },
    				dirty & /*checked*/ 2 && { checked: /*checked*/ ctx[1] },
    				dirty & /*name*/ 1024 && { name: /*name*/ ctx[10] },
    				dirty & /*disabled*/ 128 && { disabled: /*disabled*/ ctx[7] },
    				dirty & /*value*/ 256 && { value: /*value*/ ctx[8] },
    				dirty & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				dirty & /*$$restProps*/ 65536 && /*$$restProps*/ ctx[16]
    			]));

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 8) useActions_action.update.call(null, /*use*/ ctx[3]);
    			toggle_class(input, "disabled", /*disabled*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(50:3) {:else}",
    		ctx
    	});

    	return block;
    }

    // (36:3) {#if group}
    function create_if_block$7(ctx) {
    	let input;
    	let input_class_value;
    	let useActions_action;
    	let binding_group;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		{
    			class: input_class_value = /*classes*/ ctx[12].input
    		},
    		{ type: "radio" },
    		{ name: /*name*/ ctx[10] },
    		{ disabled: /*disabled*/ ctx[7] },
    		{ __value: /*value*/ ctx[8] },
    		{ id: /*id*/ ctx[6] },
    		/*$$restProps*/ ctx[16]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	binding_group = init_binding_group(/*$$binding_groups*/ ctx[23][0]);

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			toggle_class(input, "disabled", /*disabled*/ ctx[7]);
    			add_location(input, file$8, 36, 4, 1311);
    			binding_group.p(input);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			input.checked = input.__value === /*group*/ ctx[2];

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[22]),
    					action_destroyer(useActions_action = useActions.call(null, input, /*use*/ ctx[3])),
    					action_destroyer(/*forwardEvents*/ ctx[14].call(null, input))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty & /*classes*/ 4096 && input_class_value !== (input_class_value = /*classes*/ ctx[12].input) && { class: input_class_value },
    				{ type: "radio" },
    				dirty & /*name*/ 1024 && { name: /*name*/ ctx[10] },
    				dirty & /*disabled*/ 128 && { disabled: /*disabled*/ ctx[7] },
    				dirty & /*value*/ 256 && { __value: /*value*/ ctx[8] },
    				dirty & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				dirty & /*$$restProps*/ 65536 && /*$$restProps*/ ctx[16]
    			]));

    			if (dirty & /*group*/ 4) {
    				input.checked = input.__value === /*group*/ ctx[2];
    			}

    			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 8) useActions_action.update.call(null, /*use*/ ctx[3]);
    			toggle_class(input, "disabled", /*disabled*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			binding_group.r();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(36:3) {#if group}",
    		ctx
    	});

    	return block;
    }

    // (69:9) {label}
    function fallback_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*label*/ ctx[9]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 512) set_data_dev(t, /*label*/ ctx[9]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(69:9) {label}",
    		ctx
    	});

    	return block;
    }

    // (33:0) <Box bind:element class={cx(className, classes.root, getStyles({ css: override }))}>
    function create_default_slot$8(ctx) {
    	let div2;
    	let div1;
    	let t0;
    	let div0;
    	let div0_class_value;
    	let div1_class_value;
    	let t1;
    	let label_1;
    	let label_1_class_value;
    	let div2_class_value;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*group*/ ctx[2]) return create_if_block$7;
    		return create_else_block$5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);
    	const default_slot_template = /*#slots*/ ctx[21].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			if_block.c();
    			t0 = space();
    			div0 = element("div");
    			t1 = space();
    			label_1 = element("label");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(div0, "class", div0_class_value = /*classes*/ ctx[12].inner);
    			attr_dev(div0, "aria-hidden", "");
    			add_location(div0, file$8, 65, 3, 1797);
    			attr_dev(div1, "class", div1_class_value = /*classes*/ ctx[12].inputContainer);
    			add_location(div1, file$8, 34, 2, 1255);
    			attr_dev(label_1, "class", label_1_class_value = /*classes*/ ctx[12].label);
    			attr_dev(label_1, "for", /*id*/ ctx[6]);
    			toggle_class(label_1, "disabled", /*disabled*/ ctx[7]);
    			add_location(label_1, file$8, 67, 2, 1850);
    			attr_dev(div2, "class", div2_class_value = /*classes*/ ctx[12].container);
    			add_location(div2, file$8, 33, 1, 1221);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			if_block.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div2, t1);
    			append_dev(div2, label_1);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(label_1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div1, t0);
    				}
    			}

    			if (!current || dirty & /*classes*/ 4096 && div0_class_value !== (div0_class_value = /*classes*/ ctx[12].inner)) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!current || dirty & /*classes*/ 4096 && div1_class_value !== (div1_class_value = /*classes*/ ctx[12].inputContainer)) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 33554432)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[25],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*label*/ 512)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			if (!current || dirty & /*classes*/ 4096 && label_1_class_value !== (label_1_class_value = /*classes*/ ctx[12].label)) {
    				attr_dev(label_1, "class", label_1_class_value);
    			}

    			if (!current || dirty & /*id*/ 64) {
    				attr_dev(label_1, "for", /*id*/ ctx[6]);
    			}

    			if (!current || dirty & /*classes, disabled*/ 4224) {
    				toggle_class(label_1, "disabled", /*disabled*/ ctx[7]);
    			}

    			if (!current || dirty & /*classes*/ 4096 && div2_class_value !== (div2_class_value = /*classes*/ ctx[12].container)) {
    				attr_dev(div2, "class", div2_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if_block.d();
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(33:0) <Box bind:element class={cx(className, classes.root, getStyles({ css: override }))}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[24](value);
    	}

    	let box_props = {
    		class: /*cx*/ ctx[13](/*className*/ ctx[4], /*classes*/ ctx[12].root, /*getStyles*/ ctx[11]({ css: /*override*/ ctx[5] })),
    		$$slots: { default: [create_default_slot$8] },
    		$$scope: { ctx }
    	};

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = {};
    			if (dirty & /*cx, className, classes, getStyles, override*/ 14384) box_changes.class = /*cx*/ ctx[13](/*className*/ ctx[4], /*classes*/ ctx[12].root, /*getStyles*/ ctx[11]({ css: /*override*/ ctx[5] }));

    			if (dirty & /*$$scope, classes, id, disabled, label, name, value, $$restProps, group, use, checked*/ 33626062) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const ctx = 'Radio';

    function instance$b($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;

    	const omit_props_names = [
    		"use","element","class","override","color","id","disabled","value","checked","label","error","labelDirection","size","name","group"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Radio', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, color = 'blue', id = randomID(), disabled = false, value = undefined, checked = false, label = '', error = false, labelDirection = 'left', size = 'sm', name = '', group = undefined } = $$props;

    	/** An action that forwards inner dom node events from parent component */
    	const forwardEvents = createEventForwarder(get_current_component());

    	function onChange(e) {
    		$$invalidate(1, checked = e.target.checked);
    	}

    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		group = this.__value;
    		$$invalidate(2, group);
    	}

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(16, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(3, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(4, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(5, override = $$new_props.override);
    		if ('color' in $$new_props) $$invalidate(17, color = $$new_props.color);
    		if ('id' in $$new_props) $$invalidate(6, id = $$new_props.id);
    		if ('disabled' in $$new_props) $$invalidate(7, disabled = $$new_props.disabled);
    		if ('value' in $$new_props) $$invalidate(8, value = $$new_props.value);
    		if ('checked' in $$new_props) $$invalidate(1, checked = $$new_props.checked);
    		if ('label' in $$new_props) $$invalidate(9, label = $$new_props.label);
    		if ('error' in $$new_props) $$invalidate(18, error = $$new_props.error);
    		if ('labelDirection' in $$new_props) $$invalidate(19, labelDirection = $$new_props.labelDirection);
    		if ('size' in $$new_props) $$invalidate(20, size = $$new_props.size);
    		if ('name' in $$new_props) $$invalidate(10, name = $$new_props.name);
    		if ('group' in $$new_props) $$invalidate(2, group = $$new_props.group);
    		if ('$$scope' in $$new_props) $$invalidate(25, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		ctx,
    		get_current_component,
    		createEventForwarder,
    		useActions,
    		randomID,
    		Box: Box$1,
    		useStyles: useStyles$1,
    		use,
    		element,
    		className,
    		override,
    		color,
    		id,
    		disabled,
    		value,
    		checked,
    		label,
    		error,
    		labelDirection,
    		size,
    		name,
    		group,
    		forwardEvents,
    		onChange,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(3, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(4, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(5, override = $$new_props.override);
    		if ('color' in $$props) $$invalidate(17, color = $$new_props.color);
    		if ('id' in $$props) $$invalidate(6, id = $$new_props.id);
    		if ('disabled' in $$props) $$invalidate(7, disabled = $$new_props.disabled);
    		if ('value' in $$props) $$invalidate(8, value = $$new_props.value);
    		if ('checked' in $$props) $$invalidate(1, checked = $$new_props.checked);
    		if ('label' in $$props) $$invalidate(9, label = $$new_props.label);
    		if ('error' in $$props) $$invalidate(18, error = $$new_props.error);
    		if ('labelDirection' in $$props) $$invalidate(19, labelDirection = $$new_props.labelDirection);
    		if ('size' in $$props) $$invalidate(20, size = $$new_props.size);
    		if ('name' in $$props) $$invalidate(10, name = $$new_props.name);
    		if ('group' in $$props) $$invalidate(2, group = $$new_props.group);
    		if ('getStyles' in $$props) $$invalidate(11, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(12, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(13, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*color, size, labelDirection, error*/ 1966080) {
    			$$invalidate(13, { cx, classes, getStyles } = useStyles$1({ color, size, labelDirection, error }, { name: 'Radio' }), cx, (((($$invalidate(12, classes), $$invalidate(17, color)), $$invalidate(20, size)), $$invalidate(19, labelDirection)), $$invalidate(18, error)), (((($$invalidate(11, getStyles), $$invalidate(17, color)), $$invalidate(20, size)), $$invalidate(19, labelDirection)), $$invalidate(18, error)));
    		}
    	};

    	return [
    		element,
    		checked,
    		group,
    		use,
    		className,
    		override,
    		id,
    		disabled,
    		value,
    		label,
    		name,
    		getStyles,
    		classes,
    		cx,
    		forwardEvents,
    		onChange,
    		$$restProps,
    		color,
    		error,
    		labelDirection,
    		size,
    		slots,
    		input_change_handler,
    		$$binding_groups,
    		box_element_binding,
    		$$scope
    	];
    }

    class Radio extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
    			use: 3,
    			element: 0,
    			class: 4,
    			override: 5,
    			color: 17,
    			id: 6,
    			disabled: 7,
    			value: 8,
    			checked: 1,
    			label: 9,
    			error: 18,
    			labelDirection: 19,
    			size: 20,
    			name: 10,
    			group: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Radio",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get use() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get error() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set error(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelDirection() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelDirection(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get group() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Radio$1 = Radio;

    /* ../node_modules/@svelteuidev/core/dist/components/Radio/RadioGroup/RadioGroup.svelte generated by Svelte v3.59.2 */

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[26] = list[i];
    	return child_ctx;
    }

    // (50:2) {:else}
    function create_else_block$4(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[24], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16777216)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[24],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[24])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[24], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(50:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (34:2) {#if items && items.length > 0}
    function create_if_block$6(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*items*/ ctx[5];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(target, anchor);
    				}
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*use, items, labelDirection, radius, size, color, name, disabled, group, onChanged*/ 206693) {
    				each_value = /*items*/ ctx[5];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(34:2) {#if items && items.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (35:3) {#each items as item}
    function create_each_block$3(ctx) {
    	let radio;
    	let updating_group;
    	let current;

    	function radio_group_binding(value) {
    		/*radio_group_binding*/ ctx[21](value);
    	}

    	function change_handler(...args) {
    		return /*change_handler*/ ctx[22](/*item*/ ctx[26], ...args);
    	}

    	let radio_props = {
    		use: /*use*/ ctx[2],
    		label: /*item*/ ctx[26].label,
    		value: /*item*/ ctx[26].value,
    		labelDirection: /*labelDirection*/ ctx[13],
    		radius: /*radius*/ ctx[10],
    		size: /*size*/ ctx[9],
    		color: /*color*/ ctx[6],
    		name: /*name*/ ctx[16],
    		disabled: /*disabled*/ ctx[8]
    	};

    	if (/*group*/ ctx[0] !== void 0) {
    		radio_props.group = /*group*/ ctx[0];
    	}

    	radio = new Radio$1({ props: radio_props, $$inline: true });
    	binding_callbacks.push(() => bind(radio, 'group', radio_group_binding));
    	radio.$on("change", change_handler);

    	const block = {
    		c: function create() {
    			create_component(radio.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(radio, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const radio_changes = {};
    			if (dirty & /*use*/ 4) radio_changes.use = /*use*/ ctx[2];
    			if (dirty & /*items*/ 32) radio_changes.label = /*item*/ ctx[26].label;
    			if (dirty & /*items*/ 32) radio_changes.value = /*item*/ ctx[26].value;
    			if (dirty & /*labelDirection*/ 8192) radio_changes.labelDirection = /*labelDirection*/ ctx[13];
    			if (dirty & /*radius*/ 1024) radio_changes.radius = /*radius*/ ctx[10];
    			if (dirty & /*size*/ 512) radio_changes.size = /*size*/ ctx[9];
    			if (dirty & /*color*/ 64) radio_changes.color = /*color*/ ctx[6];
    			if (dirty & /*name*/ 65536) radio_changes.name = /*name*/ ctx[16];
    			if (dirty & /*disabled*/ 256) radio_changes.disabled = /*disabled*/ ctx[8];

    			if (!updating_group && dirty & /*group*/ 1) {
    				updating_group = true;
    				radio_changes.group = /*group*/ ctx[0];
    				add_flush_callback(() => updating_group = false);
    			}

    			radio.$set(radio_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(radio.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(radio.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(radio, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(35:3) {#each items as item}",
    		ctx
    	});

    	return block;
    }

    // (33:1) <Group {direction} {align} {position} {spacing}>
    function create_default_slot_1$5(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$6, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*items*/ ctx[5] && /*items*/ ctx[5].length > 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$5.name,
    		type: "slot",
    		source: "(33:1) <Group {direction} {align} {position} {spacing}>",
    		ctx
    	});

    	return block;
    }

    // (32:0) <InputWrapper bind:element class={className} {label} {override} {size} {...$$restProps}>
    function create_default_slot$7(ctx) {
    	let group_1;
    	let current;

    	group_1 = new Group$1({
    			props: {
    				direction: /*direction*/ ctx[12],
    				align: /*align*/ ctx[14],
    				position: /*position*/ ctx[11],
    				spacing: /*spacing*/ ctx[15],
    				$$slots: { default: [create_default_slot_1$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(group_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(group_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const group_1_changes = {};
    			if (dirty & /*direction*/ 4096) group_1_changes.direction = /*direction*/ ctx[12];
    			if (dirty & /*align*/ 16384) group_1_changes.align = /*align*/ ctx[14];
    			if (dirty & /*position*/ 2048) group_1_changes.position = /*position*/ ctx[11];
    			if (dirty & /*spacing*/ 32768) group_1_changes.spacing = /*spacing*/ ctx[15];

    			if (dirty & /*$$scope, items, use, labelDirection, radius, size, color, name, disabled, group*/ 16852837) {
    				group_1_changes.$$scope = { dirty, ctx };
    			}

    			group_1.$set(group_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(group_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(group_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(group_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(32:0) <InputWrapper bind:element class={className} {label} {override} {size} {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let inputwrapper;
    	let updating_element;
    	let current;

    	const inputwrapper_spread_levels = [
    		{ class: /*className*/ ctx[3] },
    		{ label: /*label*/ ctx[7] },
    		{ override: /*override*/ ctx[4] },
    		{ size: /*size*/ ctx[9] },
    		/*$$restProps*/ ctx[18]
    	];

    	function inputwrapper_element_binding(value) {
    		/*inputwrapper_element_binding*/ ctx[23](value);
    	}

    	let inputwrapper_props = {
    		$$slots: { default: [create_default_slot$7] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < inputwrapper_spread_levels.length; i += 1) {
    		inputwrapper_props = assign(inputwrapper_props, inputwrapper_spread_levels[i]);
    	}

    	if (/*element*/ ctx[1] !== void 0) {
    		inputwrapper_props.element = /*element*/ ctx[1];
    	}

    	inputwrapper = new InputWrapper$1({
    			props: inputwrapper_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(inputwrapper, 'element', inputwrapper_element_binding));

    	const block = {
    		c: function create() {
    			create_component(inputwrapper.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(inputwrapper, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const inputwrapper_changes = (dirty & /*className, label, override, size, $$restProps*/ 262808)
    			? get_spread_update(inputwrapper_spread_levels, [
    					dirty & /*className*/ 8 && { class: /*className*/ ctx[3] },
    					dirty & /*label*/ 128 && { label: /*label*/ ctx[7] },
    					dirty & /*override*/ 16 && { override: /*override*/ ctx[4] },
    					dirty & /*size*/ 512 && { size: /*size*/ ctx[9] },
    					dirty & /*$$restProps*/ 262144 && get_spread_object(/*$$restProps*/ ctx[18])
    				])
    			: {};

    			if (dirty & /*$$scope, direction, align, position, spacing, items, use, labelDirection, radius, size, color, name, disabled, group*/ 16908133) {
    				inputwrapper_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 2) {
    				updating_element = true;
    				inputwrapper_changes.element = /*element*/ ctx[1];
    				add_flush_callback(() => updating_element = false);
    			}

    			inputwrapper.$set(inputwrapper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(inputwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(inputwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(inputwrapper, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"use","element","class","override","items","group","color","value","label","disabled","size","radius","position","direction","labelDirection","align","spacing","name"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RadioGroup', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, items = [], group = undefined, color = undefined, value = undefined, label = undefined, disabled = false, size = undefined, radius = undefined, position = 'left', direction = 'row', labelDirection = 'right', align = 'flex-start', spacing = 'md', name = randomID() } = $$props;
    	const dispatch = createEventDispatcher();

    	function onChanged(val, el) {
    		const checked = el.checked;
    		$$invalidate(19, value = checked ? val : undefined);
    		dispatch('change', val);
    	}

    	function radio_group_binding(value$1) {
    		group = value$1;
    		($$invalidate(0, group), $$invalidate(19, value));
    	}

    	const change_handler = (item, e) => onChanged(item.value, e.target);

    	function inputwrapper_element_binding(value) {
    		element = value;
    		$$invalidate(1, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(18, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(1, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(4, override = $$new_props.override);
    		if ('items' in $$new_props) $$invalidate(5, items = $$new_props.items);
    		if ('group' in $$new_props) $$invalidate(0, group = $$new_props.group);
    		if ('color' in $$new_props) $$invalidate(6, color = $$new_props.color);
    		if ('value' in $$new_props) $$invalidate(19, value = $$new_props.value);
    		if ('label' in $$new_props) $$invalidate(7, label = $$new_props.label);
    		if ('disabled' in $$new_props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ('size' in $$new_props) $$invalidate(9, size = $$new_props.size);
    		if ('radius' in $$new_props) $$invalidate(10, radius = $$new_props.radius);
    		if ('position' in $$new_props) $$invalidate(11, position = $$new_props.position);
    		if ('direction' in $$new_props) $$invalidate(12, direction = $$new_props.direction);
    		if ('labelDirection' in $$new_props) $$invalidate(13, labelDirection = $$new_props.labelDirection);
    		if ('align' in $$new_props) $$invalidate(14, align = $$new_props.align);
    		if ('spacing' in $$new_props) $$invalidate(15, spacing = $$new_props.spacing);
    		if ('name' in $$new_props) $$invalidate(16, name = $$new_props.name);
    		if ('$$scope' in $$new_props) $$invalidate(24, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		InputWrapper: InputWrapper$1,
    		Group: Group$1,
    		Radio: Radio$1,
    		randomID,
    		use,
    		element,
    		className,
    		override,
    		items,
    		group,
    		color,
    		value,
    		label,
    		disabled,
    		size,
    		radius,
    		position,
    		direction,
    		labelDirection,
    		align,
    		spacing,
    		name,
    		dispatch,
    		onChanged
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(2, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(1, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(4, override = $$new_props.override);
    		if ('items' in $$props) $$invalidate(5, items = $$new_props.items);
    		if ('group' in $$props) $$invalidate(0, group = $$new_props.group);
    		if ('color' in $$props) $$invalidate(6, color = $$new_props.color);
    		if ('value' in $$props) $$invalidate(19, value = $$new_props.value);
    		if ('label' in $$props) $$invalidate(7, label = $$new_props.label);
    		if ('disabled' in $$props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ('size' in $$props) $$invalidate(9, size = $$new_props.size);
    		if ('radius' in $$props) $$invalidate(10, radius = $$new_props.radius);
    		if ('position' in $$props) $$invalidate(11, position = $$new_props.position);
    		if ('direction' in $$props) $$invalidate(12, direction = $$new_props.direction);
    		if ('labelDirection' in $$props) $$invalidate(13, labelDirection = $$new_props.labelDirection);
    		if ('align' in $$props) $$invalidate(14, align = $$new_props.align);
    		if ('spacing' in $$props) $$invalidate(15, spacing = $$new_props.spacing);
    		if ('name' in $$props) $$invalidate(16, name = $$new_props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*group, value*/ 524289) {
    			$$invalidate(0, group = group || value);
    		}
    	};

    	return [
    		group,
    		element,
    		use,
    		className,
    		override,
    		items,
    		color,
    		label,
    		disabled,
    		size,
    		radius,
    		position,
    		direction,
    		labelDirection,
    		align,
    		spacing,
    		name,
    		onChanged,
    		$$restProps,
    		value,
    		slots,
    		radio_group_binding,
    		change_handler,
    		inputwrapper_element_binding,
    		$$scope
    	];
    }

    class RadioGroup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {
    			use: 2,
    			element: 1,
    			class: 3,
    			override: 4,
    			items: 5,
    			group: 0,
    			color: 6,
    			value: 19,
    			label: 7,
    			disabled: 8,
    			size: 9,
    			radius: 10,
    			position: 11,
    			direction: 12,
    			labelDirection: 13,
    			align: 14,
    			spacing: 15,
    			name: 16
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RadioGroup",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get use() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get group() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get radius() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set radius(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get position() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set position(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get direction() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set direction(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelDirection() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelDirection(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get align() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set align(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get spacing() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set spacing(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<RadioGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<RadioGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var RadioGroup$1 = RadioGroup;

    var useStyles = createStyles((theme, { align, justify, spacing }) => {
        return {
            root: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: `${align}`,
                justifyContent: `${justify}`,
                gap: theme.fn.size({ size: spacing, sizes: theme.space })
            }
        };
    });

    /* ../node_modules/@svelteuidev/core/dist/components/Stack/Stack.svelte generated by Svelte v3.59.2 */

    // (24:0) <Box  bind:element  {use}  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >
    function create_default_slot$6(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(24:0) <Box  bind:element  {use}  class={cx(className, classes.root, getStyles({ css: override }))}  {...$$restProps} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let box;
    	let updating_element;
    	let current;

    	const box_spread_levels = [
    		{ use: /*use*/ ctx[1] },
    		{
    			class: /*cx*/ ctx[6](/*className*/ ctx[2], /*classes*/ ctx[5].root, /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
    		},
    		/*$$restProps*/ ctx[7]
    	];

    	function box_element_binding(value) {
    		/*box_element_binding*/ ctx[12](value);
    	}

    	let box_props = {
    		$$slots: { default: [create_default_slot$6] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < box_spread_levels.length; i += 1) {
    		box_props = assign(box_props, box_spread_levels[i]);
    	}

    	if (/*element*/ ctx[0] !== void 0) {
    		box_props.element = /*element*/ ctx[0];
    	}

    	box = new Box$1({ props: box_props, $$inline: true });
    	binding_callbacks.push(() => bind(box, 'element', box_element_binding));

    	const block = {
    		c: function create() {
    			create_component(box.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(box, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const box_changes = (dirty & /*use, cx, className, classes, getStyles, override, $$restProps*/ 254)
    			? get_spread_update(box_spread_levels, [
    					dirty & /*use*/ 2 && { use: /*use*/ ctx[1] },
    					dirty & /*cx, className, classes, getStyles, override*/ 124 && {
    						class: /*cx*/ ctx[6](/*className*/ ctx[2], /*classes*/ ctx[5].root, /*getStyles*/ ctx[4]({ css: /*override*/ ctx[3] }))
    					},
    					dirty & /*$$restProps*/ 128 && get_spread_object(/*$$restProps*/ ctx[7])
    				])
    			: {};

    			if (dirty & /*$$scope*/ 8192) {
    				box_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_element && dirty & /*element*/ 1) {
    				updating_element = true;
    				box_changes.element = /*element*/ ctx[0];
    				add_flush_callback(() => updating_element = false);
    			}

    			box.$set(box_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(box.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(box.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(box, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let cx;
    	let classes;
    	let getStyles;
    	const omit_props_names = ["use","element","class","override","spacing","align","justify"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Stack', slots, ['default']);
    	let { use = [], element = undefined, class: className = '', override = {}, spacing = 'md', align = 'stretch', justify = 'center' } = $$props;

    	function box_element_binding(value) {
    		element = value;
    		$$invalidate(0, element);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('use' in $$new_props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$new_props) $$invalidate(0, element = $$new_props.element);
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('override' in $$new_props) $$invalidate(3, override = $$new_props.override);
    		if ('spacing' in $$new_props) $$invalidate(8, spacing = $$new_props.spacing);
    		if ('align' in $$new_props) $$invalidate(9, align = $$new_props.align);
    		if ('justify' in $$new_props) $$invalidate(10, justify = $$new_props.justify);
    		if ('$$scope' in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Box: Box$1,
    		useStyles,
    		use,
    		element,
    		className,
    		override,
    		spacing,
    		align,
    		justify,
    		getStyles,
    		classes,
    		cx
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('use' in $$props) $$invalidate(1, use = $$new_props.use);
    		if ('element' in $$props) $$invalidate(0, element = $$new_props.element);
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('override' in $$props) $$invalidate(3, override = $$new_props.override);
    		if ('spacing' in $$props) $$invalidate(8, spacing = $$new_props.spacing);
    		if ('align' in $$props) $$invalidate(9, align = $$new_props.align);
    		if ('justify' in $$props) $$invalidate(10, justify = $$new_props.justify);
    		if ('getStyles' in $$props) $$invalidate(4, getStyles = $$new_props.getStyles);
    		if ('classes' in $$props) $$invalidate(5, classes = $$new_props.classes);
    		if ('cx' in $$props) $$invalidate(6, cx = $$new_props.cx);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*align, justify, spacing*/ 1792) {
    			$$invalidate(6, { cx, classes, getStyles } = useStyles({ align, justify, spacing }, { name: 'Stack' }), cx, ((($$invalidate(5, classes), $$invalidate(9, align)), $$invalidate(10, justify)), $$invalidate(8, spacing)), ((($$invalidate(4, getStyles), $$invalidate(9, align)), $$invalidate(10, justify)), $$invalidate(8, spacing)));
    		}
    	};

    	return [
    		element,
    		use,
    		className,
    		override,
    		getStyles,
    		classes,
    		cx,
    		$$restProps,
    		spacing,
    		align,
    		justify,
    		slots,
    		box_element_binding,
    		$$scope
    	];
    }

    class Stack extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			use: 1,
    			element: 0,
    			class: 2,
    			override: 3,
    			spacing: 8,
    			align: 9,
    			justify: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Stack",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get use() {
    		throw new Error("<Stack>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set use(value) {
    		throw new Error("<Stack>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Stack>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Stack>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<Stack>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Stack>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get override() {
    		throw new Error("<Stack>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set override(value) {
    		throw new Error("<Stack>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get spacing() {
    		throw new Error("<Stack>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set spacing(value) {
    		throw new Error("<Stack>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get align() {
    		throw new Error("<Stack>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set align(value) {
    		throw new Error("<Stack>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get justify() {
    		throw new Error("<Stack>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set justify(value) {
    		throw new Error("<Stack>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Stack$1 = Stack;

    const LOCATION = {};
    const ROUTER = {};
    const HISTORY = {};

    const useLocation = () => getContext(LOCATION);

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     * https://github.com/reach/router/blob/master/LICENSE
     */

    const PARAM = /^:(.+)/;
    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Split up the URI into segments delimited by `/`
     * Strip starting/ending `/`
     * @param {string} uri
     * @return {string[]}
     */
    const segmentize = (uri) => uri.replace(/(^\/+|\/+$)/g, "").split("/");
    /**
     * Strip `str` of potential start and end `/`
     * @param {string} string
     * @return {string}
     */
    const stripSlashes = (string) => string.replace(/(^\/+|\/+$)/g, "");
    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    const rankRoute = (route, index) => {
        const score = route.default
            ? 0
            : segmentize(route.path).reduce((score, segment) => {
                  score += SEGMENT_POINTS;

                  if (segment === "") {
                      score += ROOT_POINTS;
                  } else if (PARAM.test(segment)) {
                      score += DYNAMIC_POINTS;
                  } else if (segment[0] === "*") {
                      score -= SEGMENT_POINTS + SPLAT_PENALTY;
                  } else {
                      score += STATIC_POINTS;
                  }

                  return score;
              }, 0);

        return { route, score, index };
    };
    /**
     * Give a score to all routes and sort them on that
     * If two routes have the exact same score, we go by index instead
     * @param {object[]} routes
     * @return {object[]}
     */
    const rankRoutes = (routes) =>
        routes
            .map(rankRoute)
            .sort((a, b) =>
                a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
            );
    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    const pick = (routes, uri) => {
        let match;
        let default_;

        const [uriPathname] = uri.split("?");
        const uriSegments = segmentize(uriPathname);
        const isRootUri = uriSegments[0] === "";
        const ranked = rankRoutes(routes);

        for (let i = 0, l = ranked.length; i < l; i++) {
            const route = ranked[i].route;
            let missed = false;

            if (route.default) {
                default_ = {
                    route,
                    params: {},
                    uri,
                };
                continue;
            }

            const routeSegments = segmentize(route.path);
            const params = {};
            const max = Math.max(uriSegments.length, routeSegments.length);
            let index = 0;

            for (; index < max; index++) {
                const routeSegment = routeSegments[index];
                const uriSegment = uriSegments[index];

                if (routeSegment && routeSegment[0] === "*") {
                    // Hit a splat, just grab the rest, and return a match
                    // uri:   /files/documents/work
                    // route: /files/* or /files/*splatname
                    const splatName =
                        routeSegment === "*" ? "*" : routeSegment.slice(1);

                    params[splatName] = uriSegments
                        .slice(index)
                        .map(decodeURIComponent)
                        .join("/");
                    break;
                }

                if (typeof uriSegment === "undefined") {
                    // URI is shorter than the route, no match
                    // uri:   /users
                    // route: /users/:userId
                    missed = true;
                    break;
                }

                const dynamicMatch = PARAM.exec(routeSegment);

                if (dynamicMatch && !isRootUri) {
                    const value = decodeURIComponent(uriSegment);
                    params[dynamicMatch[1]] = value;
                } else if (routeSegment !== uriSegment) {
                    // Current segments don't match, not dynamic, not splat, so no match
                    // uri:   /users/123/settings
                    // route: /users/:id/profile
                    missed = true;
                    break;
                }
            }

            if (!missed) {
                match = {
                    route,
                    params,
                    uri: "/" + uriSegments.slice(0, index).join("/"),
                };
                break;
            }
        }

        return match || default_ || null;
    };
    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    const combinePaths = (basepath, path) =>
        `${stripSlashes(
        path === "/"
            ? basepath
            : `${stripSlashes(basepath)}/${stripSlashes(path)}`
    )}/`;

    const canUseDOM = () =>
        typeof window !== "undefined" &&
        "document" in window &&
        "location" in window;

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.59.2 */
    const get_default_slot_changes$1 = dirty => ({ params: dirty & /*routeParams*/ 4 });
    const get_default_slot_context$1 = ctx => ({ params: /*routeParams*/ ctx[2] });

    // (42:0) {#if $activeRoute && $activeRoute.route === route}
    function create_if_block$5(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$3, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(42:0) {#if $activeRoute && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (51:4) {:else}
    function create_else_block$3(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context$1);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams*/ 132)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[7],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes$1),
    						get_default_slot_context$1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(51:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (43:4) {#if component}
    function create_if_block_1$3(ctx) {
    	let await_block_anchor;
    	let promise;
    	let current;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: false,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 12,
    		blocks: [,,,]
    	};

    	handle_promise(promise = /*component*/ ctx[0], info);

    	const block = {
    		c: function create() {
    			await_block_anchor = empty();
    			info.block.c();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, await_block_anchor, anchor);
    			info.block.m(target, info.anchor = anchor);
    			info.mount = () => await_block_anchor.parentNode;
    			info.anchor = await_block_anchor;
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty & /*component*/ 1 && promise !== (promise = /*component*/ ctx[0]) && handle_promise(promise, info)) ; else {
    				update_await_block_branch(info, ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.block);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(await_block_anchor);
    			info.block.d(detaching);
    			info.token = null;
    			info = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(43:4) {#if component}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <script>     import { getContext, onDestroy }
    function create_catch_block(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(1:0) <script>     import { getContext, onDestroy }",
    		ctx
    	});

    	return block;
    }

    // (44:49)              <svelte:component                 this={resolvedComponent?.default || resolvedComponent}
    function create_then_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*routeParams*/ ctx[2], /*routeProps*/ ctx[3]];
    	var switch_value = /*resolvedComponent*/ ctx[12]?.default || /*resolvedComponent*/ ctx[12];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*routeParams, routeProps*/ 12)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (dirty & /*component*/ 1 && switch_value !== (switch_value = /*resolvedComponent*/ ctx[12]?.default || /*resolvedComponent*/ ctx[12])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(44:49)              <svelte:component                 this={resolvedComponent?.default || resolvedComponent}",
    		ctx
    	});

    	return block;
    }

    // (1:0) <script>     import { getContext, onDestroy }
    function create_pending_block(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(1:0) <script>     import { getContext, onDestroy }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[5] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[5]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	let routeParams = {};
    	let routeProps = {};
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	registerRoute(route);

    	onDestroy(() => {
    		unregisterRoute(route);
    	});

    	$$self.$$set = $$new_props => {
    		$$invalidate(11, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(6, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		canUseDOM,
    		path,
    		component,
    		routeParams,
    		routeProps,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		route,
    		$activeRoute
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(11, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(6, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($activeRoute && $activeRoute.route === route) {
    			$$invalidate(2, routeParams = $activeRoute.params);
    			const { component: c, path, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);

    			if (c) {
    				if (c.toString().startsWith("class ")) $$invalidate(0, component = c); else $$invalidate(0, component = c());
    			}

    			canUseDOM() && !$activeRoute.preserveScroll && window?.scrollTo(0, 0);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		activeRoute,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { path: 6, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     * https://github.com/reach/router/blob/master/LICENSE
     */

    const getLocation = (source) => {
        return {
            ...source.location,
            state: source.history.state,
            key: (source.history.state && source.history.state.key) || "initial",
        };
    };
    const createHistory = (source) => {
        const listeners = [];
        let location = getLocation(source);

        return {
            get location() {
                return location;
            },

            listen(listener) {
                listeners.push(listener);

                const popstateListener = () => {
                    location = getLocation(source);
                    listener({ location, action: "POP" });
                };

                source.addEventListener("popstate", popstateListener);

                return () => {
                    source.removeEventListener("popstate", popstateListener);
                    const index = listeners.indexOf(listener);
                    listeners.splice(index, 1);
                };
            },

            navigate(to, { state, replace = false, preserveScroll = false } = {}) {
                state = { ...state, key: Date.now() + "" };
                // try...catch iOS Safari limits to 100 pushState calls
                try {
                    if (replace) source.history.replaceState(state, "", to);
                    else source.history.pushState(state, "", to);
                } catch (e) {
                    source.location[replace ? "replace" : "assign"](to);
                }
                location = getLocation(source);
                listeners.forEach((listener) =>
                    listener({ location, action: "PUSH", preserveScroll })
                );
                document.activeElement.blur();
            },
        };
    };
    // Stores history entries in memory for testing or other platforms like Native
    const createMemorySource = (initialPathname = "/") => {
        let index = 0;
        const stack = [{ pathname: initialPathname, search: "" }];
        const states = [];

        return {
            get location() {
                return stack[index];
            },
            addEventListener(name, fn) {},
            removeEventListener(name, fn) {},
            history: {
                get entries() {
                    return stack;
                },
                get index() {
                    return index;
                },
                get state() {
                    return states[index];
                },
                pushState(state, _, uri) {
                    const [pathname, search = ""] = uri.split("?");
                    index++;
                    stack.push({ pathname, search });
                    states.push(state);
                },
                replaceState(state, _, uri) {
                    const [pathname, search = ""] = uri.split("?");
                    stack[index] = { pathname, search };
                    states[index] = state;
                },
            },
        };
    };
    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const globalHistory = createHistory(
        canUseDOM() ? window : createMemorySource()
    );
    const { navigate } = globalHistory;

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.59.2 */

    const { Object: Object_1 } = globals;
    const file$7 = "node_modules/svelte-routing/src/Router.svelte";

    const get_default_slot_changes_1 = dirty => ({
    	route: dirty & /*$activeRoute*/ 4,
    	location: dirty & /*$location*/ 2
    });

    const get_default_slot_context_1 = ctx => ({
    	route: /*$activeRoute*/ ctx[2] && /*$activeRoute*/ ctx[2].uri,
    	location: /*$location*/ ctx[1]
    });

    const get_default_slot_changes = dirty => ({
    	route: dirty & /*$activeRoute*/ 4,
    	location: dirty & /*$location*/ 2
    });

    const get_default_slot_context = ctx => ({
    	route: /*$activeRoute*/ ctx[2] && /*$activeRoute*/ ctx[2].uri,
    	location: /*$location*/ ctx[1]
    });

    // (141:0) {:else}
    function create_else_block$2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], get_default_slot_context_1);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, $activeRoute, $location*/ 16390)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, get_default_slot_changes_1),
    						get_default_slot_context_1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(141:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (132:0) {#if viewtransition}
    function create_if_block$4(ctx) {
    	let previous_key = /*$location*/ ctx[1].pathname;
    	let key_block_anchor;
    	let current;
    	let key_block = create_key_block(ctx);

    	const block = {
    		c: function create() {
    			key_block.c();
    			key_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			key_block.m(target, anchor);
    			insert_dev(target, key_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$location*/ 2 && safe_not_equal(previous_key, previous_key = /*$location*/ ctx[1].pathname)) {
    				group_outros();
    				transition_out(key_block, 1, 1, noop);
    				check_outros();
    				key_block = create_key_block(ctx);
    				key_block.c();
    				transition_in(key_block, 1);
    				key_block.m(key_block_anchor.parentNode, key_block_anchor);
    			} else {
    				key_block.p(ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(key_block_anchor);
    			key_block.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(132:0) {#if viewtransition}",
    		ctx
    	});

    	return block;
    }

    // (133:4) {#key $location.pathname}
    function create_key_block(ctx) {
    	let div;
    	let div_intro;
    	let div_outro;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], get_default_slot_context);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			add_location(div, file$7, 133, 8, 4613);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, $activeRoute, $location*/ 16390)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);

    			add_render_callback(() => {
    				if (!current) return;
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, /*viewtransitionFn*/ ctx[3], {});
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, /*viewtransitionFn*/ ctx[3], {});
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_key_block.name,
    		type: "key",
    		source: "(133:4) {#key $location.pathname}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$4, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*viewtransition*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let $activeRoute;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	let { viewtransition = null } = $$props;
    	let { history = globalHistory } = $$props;

    	const viewtransitionFn = (node, _, direction) => {
    		const vt = viewtransition(direction);
    		if (typeof vt?.fn === "function") return vt.fn(node, vt); else return vt;
    	};

    	setContext(HISTORY, history);
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(12, $routes = value));
    	const activeRoute = writable(null);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(2, $activeRoute = value));
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : history.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(1, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(13, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (!activeRoute) return base;

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	const registerRoute = route => {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) return;

    			const matchingRoute = pick([route], $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => [...rs, route]);
    		}
    	};

    	const unregisterRoute = route => {
    		routes.update(rs => rs.filter(r => r !== route));
    	};

    	let preserveScroll = false;

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = history.listen(event => {
    				$$invalidate(11, preserveScroll = event.preserveScroll || false);
    				location.set(event.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url', 'viewtransition', 'history'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(8, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(9, url = $$props.url);
    		if ('viewtransition' in $$props) $$invalidate(0, viewtransition = $$props.viewtransition);
    		if ('history' in $$props) $$invalidate(10, history = $$props.history);
    		if ('$$scope' in $$props) $$invalidate(14, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onMount,
    		setContext,
    		derived,
    		writable,
    		HISTORY,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		combinePaths,
    		pick,
    		basepath,
    		url,
    		viewtransition,
    		history,
    		viewtransitionFn,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		preserveScroll,
    		$location,
    		$routes,
    		$base,
    		$activeRoute
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(8, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(9, url = $$props.url);
    		if ('viewtransition' in $$props) $$invalidate(0, viewtransition = $$props.viewtransition);
    		if ('history' in $$props) $$invalidate(10, history = $$props.history);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    		if ('preserveScroll' in $$props) $$invalidate(11, preserveScroll = $$props.preserveScroll);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 8192) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;
    				routes.update(rs => rs.map(r => Object.assign(r, { path: combinePaths(basepath, r._path) })));
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location, preserveScroll*/ 6146) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set({ ...bestMatch, preserveScroll });
    			}
    		}
    	};

    	return [
    		viewtransition,
    		$location,
    		$activeRoute,
    		viewtransitionFn,
    		routes,
    		activeRoute,
    		location,
    		base,
    		basepath,
    		url,
    		history,
    		preserveScroll,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			basepath: 8,
    			url: 9,
    			viewtransition: 0,
    			history: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewtransition() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewtransition(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get history() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set history(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/CreatePoll.svelte generated by Svelte v3.59.2 */

    const { console: console_1$1 } = globals;

    const file$6 = "src/CreatePoll.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[13] = list;
    	child_ctx[14] = i;
    	return child_ctx;
    }

    // (97:12) <Text size="lg" weight="600" class="section-title">
    function create_default_slot_7$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("⚡ Response Options");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$2.name,
    		type: "slot",
    		source: "(97:12) <Text size=\\\"lg\\\" weight=\\\"600\\\" class=\\\"section-title\\\">",
    		ctx
    	});

    	return block;
    }

    // (100:12) <Badge variant="light" color="blue" size="sm">
    function create_default_slot_6$2(ctx) {
    	let t0_value = /*responses*/ ctx[1].filter(func$1).length + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			t1 = text(" options");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*responses*/ 2 && t0_value !== (t0_value = /*responses*/ ctx[1].filter(func$1).length + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$2.name,
    		type: "slot",
    		source: "(100:12) <Badge variant=\\\"light\\\" color=\\\"blue\\\" size=\\\"sm\\\">",
    		ctx
    	});

    	return block;
    }

    // (117:16) {#if responses.length > 2 && index < responses.length - 1}
    function create_if_block_1$2(ctx) {
    	let actionicon;
    	let current;

    	function click_handler() {
    		return /*click_handler*/ ctx[10](/*index*/ ctx[14]);
    	}

    	actionicon = new ActionIcon$1({
    			props: {
    				variant: "subtle",
    				color: "red",
    				size: "lg",
    				radius: "xl",
    				title: "Remove this option",
    				$$slots: { default: [create_default_slot_5$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	actionicon.$on("click", click_handler);

    	const block = {
    		c: function create() {
    			create_component(actionicon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(actionicon, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const actionicon_changes = {};

    			if (dirty & /*$$scope*/ 32768) {
    				actionicon_changes.$$scope = { dirty, ctx };
    			}

    			actionicon.$set(actionicon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(actionicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(actionicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(actionicon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(117:16) {#if responses.length > 2 && index < responses.length - 1}",
    		ctx
    	});

    	return block;
    }

    // (118:18) <ActionIcon                     variant="subtle"                     color="red"                     size="lg"                     radius="xl"                     on:click={() => removeOption(index)}                     title="Remove this option"                   >
    function create_default_slot_5$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("❌");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$3.name,
    		type: "slot",
    		source: "(118:18) <ActionIcon                     variant=\\\"subtle\\\"                     color=\\\"red\\\"                     size=\\\"lg\\\"                     radius=\\\"xl\\\"                     on:click={() => removeOption(index)}                     title=\\\"Remove this option\\\"                   >",
    		ctx
    	});

    	return block;
    }

    // (106:12) {#each responses as _, index (index)}
    function create_each_block$2(key_1, ctx) {
    	let div1;
    	let div0;
    	let t0_value = /*index*/ ctx[14] + 1 + "";
    	let t0;
    	let t1;
    	let textinput;
    	let updating_value;
    	let t2;
    	let t3;
    	let current;

    	function textinput_value_binding_1(value) {
    		/*textinput_value_binding_1*/ ctx[9](value, /*index*/ ctx[14]);
    	}

    	let textinput_props = {
    		size: "md",
    		radius: "md",
    		"aria-label": "Response Option Field",
    		placeholder: /*index*/ ctx[14] === 0
    		? "First option..."
    		: /*index*/ ctx[14] === 1
    			? "Second option..."
    			: `Option ${/*index*/ ctx[14] + 1}...`,
    		class: "option-input"
    	};

    	if (/*responses*/ ctx[1][/*index*/ ctx[14]] !== void 0) {
    		textinput_props.value = /*responses*/ ctx[1][/*index*/ ctx[14]];
    	}

    	textinput = new TextInput$1({ props: textinput_props, $$inline: true });
    	binding_callbacks.push(() => bind(textinput, 'value', textinput_value_binding_1));
    	let if_block = /*responses*/ ctx[1].length > 2 && /*index*/ ctx[14] < /*responses*/ ctx[1].length - 1 && create_if_block_1$2(ctx);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(textinput.$$.fragment);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			attr_dev(div0, "class", "option-number svelte-3bswx9");
    			add_location(div0, file$6, 107, 16, 3296);
    			attr_dev(div1, "class", "option-row svelte-3bswx9");
    			toggle_class(div1, "is-last", /*index*/ ctx[14] === /*responses*/ ctx[1].length - 1);
    			add_location(div1, file$6, 106, 14, 3208);
    			this.first = div1;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div1, t1);
    			mount_component(textinput, div1, null);
    			append_dev(div1, t2);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t3);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*responses*/ 2) && t0_value !== (t0_value = /*index*/ ctx[14] + 1 + "")) set_data_dev(t0, t0_value);
    			const textinput_changes = {};

    			if (dirty & /*responses*/ 2) textinput_changes.placeholder = /*index*/ ctx[14] === 0
    			? "First option..."
    			: /*index*/ ctx[14] === 1
    				? "Second option..."
    				: `Option ${/*index*/ ctx[14] + 1}...`;

    			if (!updating_value && dirty & /*responses*/ 2) {
    				updating_value = true;
    				textinput_changes.value = /*responses*/ ctx[1][/*index*/ ctx[14]];
    				add_flush_callback(() => updating_value = false);
    			}

    			textinput.$set(textinput_changes);

    			if (/*responses*/ ctx[1].length > 2 && /*index*/ ctx[14] < /*responses*/ ctx[1].length - 1) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*responses*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, t3);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*responses*/ 2) {
    				toggle_class(div1, "is-last", /*index*/ ctx[14] === /*responses*/ ctx[1].length - 1);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textinput.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textinput.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(textinput);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(106:12) {#each responses as _, index (index)}",
    		ctx
    	});

    	return block;
    }

    // (136:10) <Text size="lg" weight="600" class="section-title">
    function create_default_slot_4$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("⚙️ Poll Settings");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$4.name,
    		type: "slot",
    		source: "(136:10) <Text size=\\\"lg\\\" weight=\\\"600\\\" class=\\\"section-title\\\">",
    		ctx
    	});

    	return block;
    }

    // (149:8) {#if errorMessage}
    function create_if_block$3(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let text_1;
    	let current;

    	text_1 = new Text$1({
    			props: {
    				weight: "500",
    				color: "red",
    				$$slots: { default: [create_default_slot_3$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "⚠️";
    			t1 = space();
    			create_component(text_1.$$.fragment);
    			attr_dev(div0, "class", "error-icon svelte-3bswx9");
    			add_location(div0, file$6, 150, 12, 4794);
    			attr_dev(div1, "class", "error-notification svelte-3bswx9");
    			add_location(div1, file$6, 149, 10, 4749);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);
    			mount_component(text_1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope, errorMessage*/ 32784) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(149:8) {#if errorMessage}",
    		ctx
    	});

    	return block;
    }

    // (152:12) <Text weight="500" color="red">
    function create_default_slot_3$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*errorMessage*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*errorMessage*/ 16) set_data_dev(t, /*errorMessage*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$4.name,
    		type: "slot",
    		source: "(152:12) <Text weight=\\\"500\\\" color=\\\"red\\\">",
    		ctx
    	});

    	return block;
    }

    // (158:10) <Button             type="submit"             disabled={!canSubmit || isSubmitting}             size="xl"             radius="xl"             variant="gradient"             gradient={{ from: 'purple', to: 'pink' }}             loading={isSubmitting}             class="create-button"           >
    function create_default_slot_2$4(ctx) {
    	let t_value = (/*isSubmitting*/ ctx[5]
    	? '🚀 Creating Your Poll...'
    	: '🎉 Create My Poll!') + "";

    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*isSubmitting*/ 32 && t_value !== (t_value = (/*isSubmitting*/ ctx[5]
    			? '🚀 Creating Your Poll...'
    			: '🎉 Create My Poll!') + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$4.name,
    		type: "slot",
    		source: "(158:10) <Button             type=\\\"submit\\\"             disabled={!canSubmit || isSubmitting}             size=\\\"xl\\\"             radius=\\\"xl\\\"             variant=\\\"gradient\\\"             gradient={{ from: 'purple', to: 'pink' }}             loading={isSubmitting}             class=\\\"create-button\\\"           >",
    		ctx
    	});

    	return block;
    }

    // (80:6) <Stack spacing="xl">
    function create_default_slot_1$4(ctx) {
    	let div0;
    	let textinput;
    	let updating_value;
    	let t0;
    	let div3;
    	let div1;
    	let text0;
    	let t1;
    	let badge;
    	let t2;
    	let div2;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t3;
    	let div5;
    	let text1;
    	let t4;
    	let div4;
    	let checkbox;
    	let updating_checked;
    	let t5;
    	let t6;
    	let div6;
    	let button;
    	let current;

    	function textinput_value_binding(value) {
    		/*textinput_value_binding*/ ctx[8](value);
    	}

    	let textinput_props = {
    		size: "lg",
    		radius: "md",
    		"aria-label": "Question Field",
    		placeholder: "e.g., What's your favorite programming language?",
    		class: "question-input"
    	};

    	if (/*question*/ ctx[0] !== void 0) {
    		textinput_props.value = /*question*/ ctx[0];
    	}

    	textinput = new TextInput$1({ props: textinput_props, $$inline: true });
    	binding_callbacks.push(() => bind(textinput, 'value', textinput_value_binding));

    	text0 = new Text$1({
    			props: {
    				size: "lg",
    				weight: "600",
    				class: "section-title",
    				$$slots: { default: [create_default_slot_7$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	badge = new Badge$1({
    			props: {
    				variant: "light",
    				color: "blue",
    				size: "sm",
    				$$slots: { default: [create_default_slot_6$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = /*responses*/ ctx[1];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*index*/ ctx[14];
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	text1 = new Text$1({
    			props: {
    				size: "lg",
    				weight: "600",
    				class: "section-title",
    				$$slots: { default: [create_default_slot_4$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function checkbox_checked_binding(value) {
    		/*checkbox_checked_binding*/ ctx[11](value);
    	}

    	let checkbox_props = {
    		size: "md",
    		label: "Limit votes to one per user",
    		description: "Prevents users from voting multiple times using cookies"
    	};

    	if (/*limitVotes*/ ctx[2] !== void 0) {
    		checkbox_props.checked = /*limitVotes*/ ctx[2];
    	}

    	checkbox = new Checkbox$1({ props: checkbox_props, $$inline: true });
    	binding_callbacks.push(() => bind(checkbox, 'checked', checkbox_checked_binding));
    	let if_block = /*errorMessage*/ ctx[4] && create_if_block$3(ctx);

    	button = new Button$1({
    			props: {
    				type: "submit",
    				disabled: !/*canSubmit*/ ctx[3] || /*isSubmitting*/ ctx[5],
    				size: "xl",
    				radius: "xl",
    				variant: "gradient",
    				gradient: { from: 'purple', to: 'pink' },
    				loading: /*isSubmitting*/ ctx[5],
    				class: "create-button",
    				$$slots: { default: [create_default_slot_2$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			create_component(textinput.$$.fragment);
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			create_component(text0.$$.fragment);
    			t1 = space();
    			create_component(badge.$$.fragment);
    			t2 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			div5 = element("div");
    			create_component(text1.$$.fragment);
    			t4 = space();
    			div4 = element("div");
    			create_component(checkbox.$$.fragment);
    			t5 = space();
    			if (if_block) if_block.c();
    			t6 = space();
    			div6 = element("div");
    			create_component(button.$$.fragment);
    			attr_dev(div0, "class", "question-section svelte-3bswx9");
    			add_location(div0, file$6, 82, 8, 2398);
    			attr_dev(div1, "class", "options-header svelte-3bswx9");
    			add_location(div1, file$6, 95, 10, 2790);
    			attr_dev(div2, "class", "options-list svelte-3bswx9");
    			add_location(div2, file$6, 104, 10, 3117);
    			attr_dev(div3, "class", "options-section svelte-3bswx9");
    			add_location(div3, file$6, 94, 8, 2750);
    			attr_dev(div4, "class", "settings-content svelte-3bswx9");
    			add_location(div4, file$6, 138, 10, 4413);
    			attr_dev(div5, "class", "settings-section svelte-3bswx9");
    			add_location(div5, file$6, 134, 8, 4263);
    			attr_dev(div6, "class", "submit-section svelte-3bswx9");
    			add_location(div6, file$6, 156, 8, 4964);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			mount_component(textinput, div0, null);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			mount_component(text0, div1, null);
    			append_dev(div1, t1);
    			mount_component(badge, div1, null);
    			append_dev(div3, t2);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div2, null);
    				}
    			}

    			insert_dev(target, t3, anchor);
    			insert_dev(target, div5, anchor);
    			mount_component(text1, div5, null);
    			append_dev(div5, t4);
    			append_dev(div5, div4);
    			mount_component(checkbox, div4, null);
    			insert_dev(target, t5, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, div6, anchor);
    			mount_component(button, div6, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const textinput_changes = {};

    			if (!updating_value && dirty & /*question*/ 1) {
    				updating_value = true;
    				textinput_changes.value = /*question*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			textinput.$set(textinput_changes);
    			const text0_changes = {};

    			if (dirty & /*$$scope*/ 32768) {
    				text0_changes.$$scope = { dirty, ctx };
    			}

    			text0.$set(text0_changes);
    			const badge_changes = {};

    			if (dirty & /*$$scope, responses*/ 32770) {
    				badge_changes.$$scope = { dirty, ctx };
    			}

    			badge.$set(badge_changes);

    			if (dirty & /*responses, removeOption*/ 66) {
    				each_value = /*responses*/ ctx[1];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div2, outro_and_destroy_block, create_each_block$2, null, get_each_context$2);
    				check_outros();
    			}

    			const text1_changes = {};

    			if (dirty & /*$$scope*/ 32768) {
    				text1_changes.$$scope = { dirty, ctx };
    			}

    			text1.$set(text1_changes);
    			const checkbox_changes = {};

    			if (!updating_checked && dirty & /*limitVotes*/ 4) {
    				updating_checked = true;
    				checkbox_changes.checked = /*limitVotes*/ ctx[2];
    				add_flush_callback(() => updating_checked = false);
    			}

    			checkbox.$set(checkbox_changes);

    			if (/*errorMessage*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*errorMessage*/ 16) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t6.parentNode, t6);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			const button_changes = {};
    			if (dirty & /*canSubmit, isSubmitting*/ 40) button_changes.disabled = !/*canSubmit*/ ctx[3] || /*isSubmitting*/ ctx[5];
    			if (dirty & /*isSubmitting*/ 32) button_changes.loading = /*isSubmitting*/ ctx[5];

    			if (dirty & /*$$scope, isSubmitting*/ 32800) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textinput.$$.fragment, local);
    			transition_in(text0.$$.fragment, local);
    			transition_in(badge.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(text1.$$.fragment, local);
    			transition_in(checkbox.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textinput.$$.fragment, local);
    			transition_out(text0.$$.fragment, local);
    			transition_out(badge.$$.fragment, local);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(text1.$$.fragment, local);
    			transition_out(checkbox.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_component(textinput);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div3);
    			destroy_component(text0);
    			destroy_component(badge);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div5);
    			destroy_component(text1);
    			destroy_component(checkbox);
    			if (detaching) detach_dev(t5);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(div6);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(80:6) <Stack spacing=\\\"xl\\\">",
    		ctx
    	});

    	return block;
    }

    // (69:2) <Card class="create-poll-card" shadow="xl" radius="lg">
    function create_default_slot$5(ctx) {
    	let div1;
    	let div0;
    	let h1;
    	let span0;
    	let t1;
    	let span1;
    	let t3;
    	let form;
    	let stack;
    	let current;
    	let mounted;
    	let dispose;

    	stack = new Stack$1({
    			props: {
    				spacing: "xl",
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			span0 = element("span");
    			span0.textContent = "🗳️";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "Create a New Poll";
    			t3 = space();
    			form = element("form");
    			create_component(stack.$$.fragment);
    			attr_dev(span0, "class", "title-icon svelte-3bswx9");
    			add_location(span0, file$6, 72, 10, 2116);
    			attr_dev(span1, "class", "title-text svelte-3bswx9");
    			add_location(span1, file$6, 73, 10, 2162);
    			attr_dev(h1, "class", "page-title svelte-3bswx9");
    			add_location(h1, file$6, 71, 8, 2082);
    			attr_dev(div0, "class", "header-content svelte-3bswx9");
    			add_location(div0, file$6, 70, 6, 2045);
    			attr_dev(div1, "class", "card-header svelte-3bswx9");
    			add_location(div1, file$6, 69, 4, 2013);
    			attr_dev(form, "class", "poll-form svelte-3bswx9");
    			add_location(form, file$6, 78, 4, 2255);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(h1, span0);
    			append_dev(h1, t1);
    			append_dev(h1, span1);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, form, anchor);
    			mount_component(stack, form, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(form, "submit", prevent_default(/*handleSubmit*/ ctx[7]), false, true, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const stack_changes = {};

    			if (dirty & /*$$scope, canSubmit, isSubmitting, errorMessage, limitVotes, responses, question*/ 32831) {
    				stack_changes.$$scope = { dirty, ctx };
    			}

    			stack.$set(stack_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(stack.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(stack.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(form);
    			destroy_component(stack);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(69:2) <Card class=\\\"create-poll-card\\\" shadow=\\\"xl\\\" radius=\\\"lg\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				class: "create-poll-card",
    				shadow: "xl",
    				radius: "lg",
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(card.$$.fragment);
    			attr_dev(div, "class", "create-poll-container svelte-3bswx9");
    			add_location(div, file$6, 67, 0, 1915);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(card, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const card_changes = {};

    			if (dirty & /*$$scope, canSubmit, isSubmitting, errorMessage, limitVotes, responses, question*/ 32831) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(card);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$1 = r => r.trim();

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CreatePoll', slots, []);
    	let question = "";
    	let responses = ["", ""];
    	let limitVotes = false;
    	let canSubmit = false;
    	let errorMessage = "";
    	let isSubmitting = false;

    	function removeOption(index) {
    		if (responses.length > 2) {
    			$$invalidate(1, responses = responses.filter((_, i) => i !== index));
    		}
    	}

    	async function handleSubmit() {
    		if (!canSubmit) {
    			$$invalidate(4, errorMessage = "Please enter a question and at least two options.");
    			return;
    		}

    		$$invalidate(4, errorMessage = "");
    		$$invalidate(5, isSubmitting = true);

    		try {
    			const validOptions = responses.filter(response => Boolean(response.trim()));

    			const response = await fetch("/api/create", {
    				method: "POST",
    				headers: { "Content-Type": "application/json" },
    				body: JSON.stringify({
    					question,
    					limit_votes: limitVotes,
    					responses: validOptions.map(text => ({ text }))
    				})
    			});

    			const data = await response.json();

    			if (response.ok) {
    				// Success - navigate to the new poll
    				navigate(`/polls/${data.id}`);
    			} else {
    				// Server validation error
    				$$invalidate(4, errorMessage = data.error || "Failed to create poll. Please try again.");
    			}
    		} catch(error) {
    			// Network or other error
    			$$invalidate(4, errorMessage = "Network error. Please check your connection and try again.");

    			console.error("Error creating poll:", error);
    		} finally {
    			$$invalidate(5, isSubmitting = false);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<CreatePoll> was created with unknown prop '${key}'`);
    	});

    	function textinput_value_binding(value) {
    		question = value;
    		$$invalidate(0, question);
    	}

    	function textinput_value_binding_1(value, index) {
    		if ($$self.$$.not_equal(responses[index], value)) {
    			responses[index] = value;
    			$$invalidate(1, responses);
    		}
    	}

    	const click_handler = index => removeOption(index);

    	function checkbox_checked_binding(value) {
    		limitVotes = value;
    		$$invalidate(2, limitVotes);
    	}

    	$$self.$capture_state = () => ({
    		navigate,
    		Button: Button$1,
    		TextInput: TextInput$1,
    		Checkbox: Checkbox$1,
    		Text: Text$1,
    		Card,
    		Badge: Badge$1,
    		ActionIcon: ActionIcon$1,
    		Stack: Stack$1,
    		Group: Group$1,
    		question,
    		responses,
    		limitVotes,
    		canSubmit,
    		errorMessage,
    		isSubmitting,
    		removeOption,
    		handleSubmit
    	});

    	$$self.$inject_state = $$props => {
    		if ('question' in $$props) $$invalidate(0, question = $$props.question);
    		if ('responses' in $$props) $$invalidate(1, responses = $$props.responses);
    		if ('limitVotes' in $$props) $$invalidate(2, limitVotes = $$props.limitVotes);
    		if ('canSubmit' in $$props) $$invalidate(3, canSubmit = $$props.canSubmit);
    		if ('errorMessage' in $$props) $$invalidate(4, errorMessage = $$props.errorMessage);
    		if ('isSubmitting' in $$props) $$invalidate(5, isSubmitting = $$props.isSubmitting);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*responses*/ 2) {
    			if (responses[responses.length - 1]) {
    				$$invalidate(1, responses = [...responses, ""]);
    			}
    		}

    		if ($$self.$$.dirty & /*question, responses*/ 3) {
    			$$invalidate(3, canSubmit = question.trim() && responses.filter(opt => opt.trim()).length >= 2);
    		}
    	};

    	return [
    		question,
    		responses,
    		limitVotes,
    		canSubmit,
    		errorMessage,
    		isSubmitting,
    		removeOption,
    		handleSubmit,
    		textinput_value_binding,
    		textinput_value_binding_1,
    		click_handler,
    		checkbox_checked_binding
    	];
    }

    class CreatePoll extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreatePoll",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/ViewPoll.svelte generated by Svelte v3.59.2 */

    const { console: console_1 } = globals;

    const file$5 = "src/ViewPoll.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	child_ctx[17] = i;
    	return child_ctx;
    }

    // (222:2) {:else}
    function create_else_block_1$1(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				class: "error-card",
    				shadow: "lg",
    				radius: "lg",
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(222:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (122:21) 
    function create_if_block_2$1(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				class: "main-poll-card",
    				shadow: "xl",
    				radius: "lg",
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = {};

    			if (dirty & /*$$scope, pollData, hasVoted, selectedOption, errorMessage, responseData, shareMessage*/ 262303) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(122:21) ",
    		ctx
    	});

    	return block;
    }

    // (115:22) 
    function create_if_block_1$1(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				class: "loading-card",
    				shadow: "lg",
    				radius: "lg",
    				$$slots: { default: [create_default_slot_4$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(115:22) ",
    		ctx
    	});

    	return block;
    }

    // (102:2) {#if loadingError}
    function create_if_block$2(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				class: "error-card",
    				shadow: "lg",
    				radius: "lg",
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = {};

    			if (dirty & /*$$scope, loadingError*/ 262176) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(102:2) {#if loadingError}",
    		ctx
    	});

    	return block;
    }

    // (226:8) <Text size="xl" weight="600" class="error-title">
    function create_default_slot_17(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Something went wrong loading this poll.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17.name,
    		type: "slot",
    		source: "(226:8) <Text size=\\\"xl\\\" weight=\\\"600\\\" class=\\\"error-title\\\">",
    		ctx
    	});

    	return block;
    }

    // (223:4) <Card class="error-card" shadow="lg" radius="lg">
    function create_default_slot_16(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let text_1;
    	let current;

    	text_1 = new Text$1({
    			props: {
    				size: "xl",
    				weight: "600",
    				class: "error-title",
    				$$slots: { default: [create_default_slot_17] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "💥";
    			t1 = space();
    			create_component(text_1.$$.fragment);
    			attr_dev(div0, "class", "error-icon svelte-17ddm3o");
    			add_location(div0, file$5, 224, 8, 6689);
    			attr_dev(div1, "class", "card-content svelte-17ddm3o");
    			add_location(div1, file$5, 223, 6, 6654);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);
    			mount_component(text_1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16.name,
    		type: "slot",
    		source: "(223:4) <Card class=\\\"error-card\\\" shadow=\\\"lg\\\" radius=\\\"lg\\\">",
    		ctx
    	});

    	return block;
    }

    // (127:10) {#if pollData.limit_votes}
    function create_if_block_6(ctx) {
    	let badge;
    	let current;

    	badge = new Badge$1({
    			props: {
    				variant: "gradient",
    				gradient: { from: 'blue', to: 'purple' },
    				size: "sm",
    				$$slots: { default: [create_default_slot_15$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(badge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(badge, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(badge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(badge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(badge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(127:10) {#if pollData.limit_votes}",
    		ctx
    	});

    	return block;
    }

    // (128:12) <Badge variant="gradient" gradient={{ from: 'blue', to: 'purple' }} size="sm">
    function create_default_slot_15$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("One Vote Per Person");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15$1.name,
    		type: "slot",
    		source: "(128:12) <Badge variant=\\\"gradient\\\" gradient={{ from: 'blue', to: 'purple' }} size=\\\"sm\\\">",
    		ctx
    	});

    	return block;
    }

    // (135:10) <Button              variant="gradient"              gradient={{ from: 'teal', to: 'blue' }}              size="sm"              radius="xl"             on:click={sharePoll}             class="share-button"           >
    function create_default_slot_14$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Share");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14$1.name,
    		type: "slot",
    		source: "(135:10) <Button              variant=\\\"gradient\\\"              gradient={{ from: 'teal', to: 'blue' }}              size=\\\"sm\\\"              radius=\\\"xl\\\"             on:click={sharePoll}             class=\\\"share-button\\\"           >",
    		ctx
    	});

    	return block;
    }

    // (148:6) {#if shareMessage}
    function create_if_block_5$1(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let text_1;
    	let current;

    	text_1 = new Text$1({
    			props: {
    				size: "sm",
    				weight: "500",
    				color: "teal",
    				$$slots: { default: [create_default_slot_13$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "✅";
    			t1 = space();
    			create_component(text_1.$$.fragment);
    			attr_dev(div0, "class", "notification-icon svelte-17ddm3o");
    			add_location(div0, file$5, 149, 10, 4259);
    			attr_dev(div1, "class", "share-notification svelte-17ddm3o");
    			add_location(div1, file$5, 148, 8, 4216);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);
    			mount_component(text_1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope, shareMessage*/ 262272) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$1.name,
    		type: "if",
    		source: "(148:6) {#if shareMessage}",
    		ctx
    	});

    	return block;
    }

    // (151:10) <Text size="sm" weight="500" color="teal">
    function create_default_slot_13$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*shareMessage*/ ctx[7]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*shareMessage*/ 128) set_data_dev(t, /*shareMessage*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13$1.name,
    		type: "slot",
    		source: "(151:10) <Text size=\\\"sm\\\" weight=\\\"500\\\" color=\\\"teal\\\">",
    		ctx
    	});

    	return block;
    }

    // (171:6) {:else}
    function create_else_block$1(ctx) {
    	let form;
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t0;
    	let t1;
    	let group;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*responseData*/ ctx[2];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*option*/ ctx[15].value;
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	let if_block = /*errorMessage*/ ctx[4] && create_if_block_4$1(ctx);

    	group = new Group$1({
    			props: {
    				class: "action-buttons",
    				$$slots: { default: [create_default_slot_9$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			form = element("form");
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			create_component(group.$$.fragment);
    			attr_dev(div, "class", "options-container svelte-17ddm3o");
    			add_location(div, file$5, 172, 10, 5016);
    			attr_dev(form, "class", "poll-form svelte-17ddm3o");
    			add_location(form, file$5, 171, 8, 4942);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div, null);
    				}
    			}

    			append_dev(form, t0);
    			if (if_block) if_block.m(form, null);
    			append_dev(form, t1);
    			mount_component(group, form, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(form, "submit", prevent_default(/*submitVotes*/ ctx[8]), false, true, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedOption, responseData*/ 6) {
    				each_value = /*responseData*/ ctx[2];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block$1, null, get_each_context$1);
    			}

    			if (/*errorMessage*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*errorMessage*/ 16) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_4$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(form, t1);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			const group_changes = {};

    			if (dirty & /*$$scope, selectedOption, hasVoted*/ 262154) {
    				group_changes.$$scope = { dirty, ctx };
    			}

    			group.$set(group_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(group.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(group.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (if_block) if_block.d();
    			destroy_component(group);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(171:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (155:6) {#if pollData.limit_votes && hasVoted}
    function create_if_block_3$1(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let text_1;
    	let t2;
    	let button;
    	let current;

    	text_1 = new Text$1({
    			props: {
    				size: "lg",
    				weight: "500",
    				color: "dimmed",
    				$$slots: { default: [create_default_slot_8$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button = new Button$1({
    			props: {
    				variant: "gradient",
    				gradient: { from: 'grape', to: 'pink' },
    				size: "lg",
    				radius: "xl",
    				$$slots: { default: [create_default_slot_7$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*goToResults*/ ctx[9]);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "🗳️";
    			t1 = space();
    			create_component(text_1.$$.fragment);
    			t2 = space();
    			create_component(button.$$.fragment);
    			attr_dev(div0, "class", "voted-icon svelte-17ddm3o");
    			add_location(div0, file$5, 156, 10, 4489);
    			attr_dev(div1, "class", "voted-state svelte-17ddm3o");
    			add_location(div1, file$5, 155, 8, 4453);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);
    			mount_component(text_1, div1, null);
    			append_dev(div1, t2);
    			mount_component(button, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(text_1);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(155:6) {#if pollData.limit_votes && hasVoted}",
    		ctx
    	});

    	return block;
    }

    // (174:12) {#each responseData as option, index (option.value)}
    function create_each_block$1(key_1, ctx) {
    	let label;
    	let input;
    	let input_value_value;
    	let value_has_changed = false;
    	let t0;
    	let div1;
    	let div0;
    	let t1;
    	let span;
    	let t2_value = /*option*/ ctx[15].label + "";
    	let t2;
    	let t3;
    	let binding_group;
    	let mounted;
    	let dispose;
    	binding_group = init_binding_group(/*$$binding_groups*/ ctx[14][0]);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t1 = space();
    			span = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(input, "type", "radio");
    			input.__value = input_value_value = /*option*/ ctx[15].value;
    			input.value = input.__value;
    			attr_dev(input, "class", "hidden-radio svelte-17ddm3o");
    			add_location(input, file$5, 175, 16, 5220);
    			attr_dev(div0, "class", "option-indicator svelte-17ddm3o");
    			add_location(div0, file$5, 182, 18, 5467);
    			attr_dev(span, "class", "option-text svelte-17ddm3o");
    			add_location(span, file$5, 183, 18, 5522);
    			attr_dev(div1, "class", "option-content svelte-17ddm3o");
    			add_location(div1, file$5, 181, 16, 5420);
    			attr_dev(label, "class", "poll-option svelte-17ddm3o");
    			toggle_class(label, "selected", /*selectedOption*/ ctx[1] === /*option*/ ctx[15].value);
    			add_location(label, file$5, 174, 14, 5127);
    			binding_group.p(input);
    			this.first = label;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = input.__value === /*selectedOption*/ ctx[1];
    			append_dev(label, t0);
    			append_dev(label, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t1);
    			append_dev(div1, span);
    			append_dev(span, t2);
    			append_dev(label, t3);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[13]);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*responseData*/ 4 && input_value_value !== (input_value_value = /*option*/ ctx[15].value)) {
    				prop_dev(input, "__value", input_value_value);
    				input.value = input.__value;
    				value_has_changed = true;
    			}

    			if (value_has_changed || dirty & /*selectedOption, responseData*/ 6) {
    				input.checked = input.__value === /*selectedOption*/ ctx[1];
    			}

    			if (dirty & /*responseData*/ 4 && t2_value !== (t2_value = /*option*/ ctx[15].label + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*selectedOption, responseData*/ 6) {
    				toggle_class(label, "selected", /*selectedOption*/ ctx[1] === /*option*/ ctx[15].value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			binding_group.r();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(174:12) {#each responseData as option, index (option.value)}",
    		ctx
    	});

    	return block;
    }

    // (190:10) {#if errorMessage}
    function create_if_block_4$1(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let text_1;
    	let current;

    	text_1 = new Text$1({
    			props: {
    				weight: "500",
    				color: "red",
    				$$slots: { default: [create_default_slot_12$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "❌";
    			t1 = space();
    			create_component(text_1.$$.fragment);
    			attr_dev(div0, "class", "notification-icon svelte-17ddm3o");
    			add_location(div0, file$5, 191, 14, 5752);
    			attr_dev(div1, "class", "error-notification svelte-17ddm3o");
    			add_location(div1, file$5, 190, 12, 5705);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);
    			mount_component(text_1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope, errorMessage*/ 262160) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(190:10) {#if errorMessage}",
    		ctx
    	});

    	return block;
    }

    // (193:14) <Text weight="500" color="red">
    function create_default_slot_12$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*errorMessage*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*errorMessage*/ 16) set_data_dev(t, /*errorMessage*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12$1.name,
    		type: "slot",
    		source: "(193:14) <Text weight=\\\"500\\\" color=\\\"red\\\">",
    		ctx
    	});

    	return block;
    }

    // (198:12) <Button                type="submit"                disabled={!selectedOption || hasVoted}               variant="gradient"               gradient={{ from: 'blue', to: 'purple' }}               size="lg"               radius="xl"               class="vote-button"             >
    function create_default_slot_11$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("🗳️ Cast Your Vote");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11$1.name,
    		type: "slot",
    		source: "(198:12) <Button                type=\\\"submit\\\"                disabled={!selectedOption || hasVoted}               variant=\\\"gradient\\\"               gradient={{ from: 'blue', to: 'purple' }}               size=\\\"lg\\\"               radius=\\\"xl\\\"               class=\\\"vote-button\\\"             >",
    		ctx
    	});

    	return block;
    }

    // (209:12) <Button                type="button"                variant="subtle"               size="lg"               radius="xl"               on:click={goToResults}             >
    function create_default_slot_10$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("📊 View Results");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10$1.name,
    		type: "slot",
    		source: "(209:12) <Button                type=\\\"button\\\"                variant=\\\"subtle\\\"               size=\\\"lg\\\"               radius=\\\"xl\\\"               on:click={goToResults}             >",
    		ctx
    	});

    	return block;
    }

    // (197:10) <Group class="action-buttons">
    function create_default_slot_9$1(ctx) {
    	let button0;
    	let t;
    	let button1;
    	let current;

    	button0 = new Button$1({
    			props: {
    				type: "submit",
    				disabled: !/*selectedOption*/ ctx[1] || /*hasVoted*/ ctx[3],
    				variant: "gradient",
    				gradient: { from: 'blue', to: 'purple' },
    				size: "lg",
    				radius: "xl",
    				class: "vote-button",
    				$$slots: { default: [create_default_slot_11$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button$1({
    			props: {
    				type: "button",
    				variant: "subtle",
    				size: "lg",
    				radius: "xl",
    				$$slots: { default: [create_default_slot_10$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*goToResults*/ ctx[9]);

    	const block = {
    		c: function create() {
    			create_component(button0.$$.fragment);
    			t = space();
    			create_component(button1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(button1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button0_changes = {};
    			if (dirty & /*selectedOption, hasVoted*/ 10) button0_changes.disabled = !/*selectedOption*/ ctx[1] || /*hasVoted*/ ctx[3];

    			if (dirty & /*$$scope*/ 262144) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(button1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9$1.name,
    		type: "slot",
    		source: "(197:10) <Group class=\\\"action-buttons\\\">",
    		ctx
    	});

    	return block;
    }

    // (158:10) <Text size="lg" weight="500" color="dimmed">
    function create_default_slot_8$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Thanks for voting! Your response has been recorded.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8$1.name,
    		type: "slot",
    		source: "(158:10) <Text size=\\\"lg\\\" weight=\\\"500\\\" color=\\\"dimmed\\\">",
    		ctx
    	});

    	return block;
    }

    // (161:10) <Button              variant="gradient"              gradient={{ from: 'grape', to: 'pink' }}             size="lg"             radius="xl"             on:click={goToResults}           >
    function create_default_slot_7$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("🎯 View Results");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$1.name,
    		type: "slot",
    		source: "(161:10) <Button              variant=\\\"gradient\\\"              gradient={{ from: 'grape', to: 'pink' }}             size=\\\"lg\\\"             radius=\\\"xl\\\"             on:click={goToResults}           >",
    		ctx
    	});

    	return block;
    }

    // (123:4) <Card class="main-poll-card" shadow="xl" radius="lg">
    function create_default_slot_6$1(ctx) {
    	let div2;
    	let div0;
    	let h1;
    	let t0_value = /*pollData*/ ctx[0].question + "";
    	let t0;
    	let t1;
    	let t2;
    	let div1;
    	let button;
    	let t3;
    	let t4;
    	let current_block_type_index;
    	let if_block2;
    	let if_block2_anchor;
    	let current;
    	let if_block0 = /*pollData*/ ctx[0].limit_votes && create_if_block_6(ctx);

    	button = new Button$1({
    			props: {
    				variant: "gradient",
    				gradient: { from: 'teal', to: 'blue' },
    				size: "sm",
    				radius: "xl",
    				class: "share-button",
    				$$slots: { default: [create_default_slot_14$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*sharePoll*/ ctx[10]);
    	let if_block1 = /*shareMessage*/ ctx[7] && create_if_block_5$1(ctx);
    	const if_block_creators = [create_if_block_3$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*pollData*/ ctx[0].limit_votes && /*hasVoted*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			div1 = element("div");
    			create_component(button.$$.fragment);
    			t3 = space();
    			if (if_block1) if_block1.c();
    			t4 = space();
    			if_block2.c();
    			if_block2_anchor = empty();
    			attr_dev(h1, "class", "poll-question svelte-17ddm3o");
    			add_location(h1, file$5, 125, 10, 3572);
    			attr_dev(div0, "class", "poll-title-section svelte-17ddm3o");
    			add_location(div0, file$5, 124, 8, 3529);
    			attr_dev(div1, "class", "poll-actions svelte-17ddm3o");
    			add_location(div1, file$5, 133, 8, 3854);
    			attr_dev(div2, "class", "poll-header svelte-17ddm3o");
    			add_location(div2, file$5, 123, 6, 3495);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(div0, t1);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			mount_component(button, div1, null);
    			insert_dev(target, t3, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t4, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block2_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*pollData*/ 1) && t0_value !== (t0_value = /*pollData*/ ctx[0].question + "")) set_data_dev(t0, t0_value);

    			if (/*pollData*/ ctx[0].limit_votes) {
    				if (if_block0) {
    					if (dirty & /*pollData*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_6(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div0, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const button_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);

    			if (/*shareMessage*/ ctx[7]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*shareMessage*/ 128) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_5$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t4.parentNode, t4);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block2 = if_blocks[current_block_type_index];

    				if (!if_block2) {
    					if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block2.c();
    				} else {
    					if_block2.p(ctx, dirty);
    				}

    				transition_in(if_block2, 1);
    				if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(button.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(button.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block0) if_block0.d();
    			destroy_component(button);
    			if (detaching) detach_dev(t3);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t4);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block2_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(123:4) <Card class=\\\"main-poll-card\\\" shadow=\\\"xl\\\" radius=\\\"lg\\\">",
    		ctx
    	});

    	return block;
    }

    // (119:8) <Text size="xl" weight="500" color="dimmed">
    function create_default_slot_5$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Loading your poll...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$2.name,
    		type: "slot",
    		source: "(119:8) <Text size=\\\"xl\\\" weight=\\\"500\\\" color=\\\"dimmed\\\">",
    		ctx
    	});

    	return block;
    }

    // (116:4) <Card class="loading-card" shadow="lg" radius="lg">
    function create_default_slot_4$3(ctx) {
    	let div1;
    	let div0;
    	let t;
    	let text_1;
    	let current;

    	text_1 = new Text$1({
    			props: {
    				size: "xl",
    				weight: "500",
    				color: "dimmed",
    				$$slots: { default: [create_default_slot_5$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = space();
    			create_component(text_1.$$.fragment);
    			attr_dev(div0, "class", "loading-spinner svelte-17ddm3o");
    			add_location(div0, file$5, 117, 8, 3268);
    			attr_dev(div1, "class", "card-content svelte-17ddm3o");
    			add_location(div1, file$5, 116, 6, 3233);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t);
    			mount_component(text_1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$3.name,
    		type: "slot",
    		source: "(116:4) <Card class=\\\"loading-card\\\" shadow=\\\"lg\\\" radius=\\\"lg\\\">",
    		ctx
    	});

    	return block;
    }

    // (106:8) <Text size="xl" weight="600" class="error-title">
    function create_default_slot_3$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Oops! Something went wrong");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(106:8) <Text size=\\\"xl\\\" weight=\\\"600\\\" class=\\\"error-title\\\">",
    		ctx
    	});

    	return block;
    }

    // (107:8) <Text size="md" color="dimmed" class="error-description">
    function create_default_slot_2$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*loadingError*/ ctx[5]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*loadingError*/ 32) set_data_dev(t, /*loadingError*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(107:8) <Text size=\\\"md\\\" color=\\\"dimmed\\\" class=\\\"error-description\\\">",
    		ctx
    	});

    	return block;
    }

    // (110:8) <Button variant="gradient" gradient={{ from: 'pink', to: 'red' }} size="md" on:click={() => window.location.reload()}>
    function create_default_slot_1$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Try Again");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(110:8) <Button variant=\\\"gradient\\\" gradient={{ from: 'pink', to: 'red' }} size=\\\"md\\\" on:click={() => window.location.reload()}>",
    		ctx
    	});

    	return block;
    }

    // (103:4) <Card class="error-card" shadow="lg" radius="lg">
    function create_default_slot$4(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let text0;
    	let t2;
    	let text1;
    	let t3;
    	let button;
    	let current;

    	text0 = new Text$1({
    			props: {
    				size: "xl",
    				weight: "600",
    				class: "error-title",
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	text1 = new Text$1({
    			props: {
    				size: "md",
    				color: "dimmed",
    				class: "error-description",
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button = new Button$1({
    			props: {
    				variant: "gradient",
    				gradient: { from: 'pink', to: 'red' },
    				size: "md",
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[12]);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "⚠️";
    			t1 = space();
    			create_component(text0.$$.fragment);
    			t2 = space();
    			create_component(text1.$$.fragment);
    			t3 = space();
    			create_component(button.$$.fragment);
    			attr_dev(div0, "class", "error-icon svelte-17ddm3o");
    			add_location(div0, file$5, 104, 8, 2727);
    			attr_dev(div1, "class", "card-content svelte-17ddm3o");
    			add_location(div1, file$5, 103, 6, 2692);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);
    			mount_component(text0, div1, null);
    			append_dev(div1, t2);
    			mount_component(text1, div1, null);
    			append_dev(div1, t3);
    			mount_component(button, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text0_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				text0_changes.$$scope = { dirty, ctx };
    			}

    			text0.$set(text0_changes);
    			const text1_changes = {};

    			if (dirty & /*$$scope, loadingError*/ 262176) {
    				text1_changes.$$scope = { dirty, ctx };
    			}

    			text1.$set(text1_changes);
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text0.$$.fragment, local);
    			transition_in(text1.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text0.$$.fragment, local);
    			transition_out(text1.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(text0);
    			destroy_component(text1);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(103:4) <Card class=\\\"error-card\\\" shadow=\\\"lg\\\" radius=\\\"lg\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$2, create_if_block_1$1, create_if_block_2$1, create_else_block_1$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*loadingError*/ ctx[5]) return 0;
    		if (/*isLoading*/ ctx[6]) return 1;
    		if (/*pollData*/ ctx[0]) return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "poll-container svelte-17ddm3o");
    			add_location(div, file$5, 100, 0, 2582);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ViewPoll', slots, []);
    	let { id } = $$props;
    	let pollData = null;
    	let selectedOption;
    	let responseData = [];
    	let hasVoted = false;
    	let errorMessage = "";
    	let loadingError = "";
    	let isLoading = true;
    	let shareMessage = "";

    	onMount(async () => {
    		try {
    			const response = await fetch(`/api/${id}`);

    			if (!response.ok) {
    				if (response.status === 404) {
    					$$invalidate(5, loadingError = "Poll not found. It may have been deleted or the link is incorrect.");
    				} else {
    					$$invalidate(5, loadingError = "Failed to load poll. Please try again later.");
    				}

    				return;
    			}

    			const data = await response.json();

    			// Handle new response format
    			if (data.poll) {
    				$$invalidate(0, pollData = data.poll);
    				$$invalidate(3, hasVoted = data.has_voted || false);
    			} else {
    				// Handle old format for backwards compatibility
    				$$invalidate(0, pollData = data);

    				$$invalidate(3, hasVoted = false);
    			}

    			for (let i of pollData.responses) {
    				$$invalidate(2, responseData = [...responseData, { label: i.text, value: i.id }]);
    			}
    		} catch(error) {
    			$$invalidate(5, loadingError = "Network error. Please check your connection and try again.");
    			console.error("Error loading poll:", error);
    		} finally {
    			$$invalidate(6, isLoading = false);
    		}
    	});

    	async function submitVotes() {
    		try {
    			$$invalidate(4, errorMessage = "");

    			const response = await fetch(`/api/${id}/vote`, {
    				method: 'POST',
    				headers: { 'Content-Type': 'application/json' },
    				body: JSON.stringify({ response_id: selectedOption })
    			});

    			const data = await response.json();

    			if (response.ok) {
    				navigate(`/polls/${id}/r`);
    			} else if (response.status === 409) {
    				// User already voted
    				$$invalidate(4, errorMessage = data.error || "You have already voted on this poll");

    				$$invalidate(3, hasVoted = true);
    			} else {
    				$$invalidate(4, errorMessage = data.error || "Failed to submit vote");
    				console.error('Failed to submit votes:', data.error);
    			}
    		} catch(err) {
    			$$invalidate(4, errorMessage = "Network error occurred");
    			console.error('Error:', err);
    		}
    	}

    	async function goToResults() {
    		navigate(`/polls/${id}/r`);
    	}

    	async function sharePoll() {
    		try {
    			const pollUrl = window.location.href;
    			await navigator.clipboard.writeText(pollUrl);
    			$$invalidate(7, shareMessage = "Poll link copied to clipboard!");
    			setTimeout(() => $$invalidate(7, shareMessage = ""), 3000);
    		} catch(error) {
    			$$invalidate(7, shareMessage = "Failed to copy link. Please copy the URL manually.");
    			setTimeout(() => $$invalidate(7, shareMessage = ""), 5000);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
    			console_1.warn("<ViewPoll> was created without expected prop 'id'");
    		}
    	});

    	const writable_props = ['id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<ViewPoll> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];
    	const click_handler = () => window.location.reload();

    	function input_change_handler() {
    		selectedOption = this.__value;
    		$$invalidate(1, selectedOption);
    	}

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(11, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		navigate,
    		Stack: Stack$1,
    		Button: Button$1,
    		RadioGroup: RadioGroup$1,
    		Text: Text$1,
    		Card,
    		Badge: Badge$1,
    		Group: Group$1,
    		ActionIcon: ActionIcon$1,
    		id,
    		pollData,
    		selectedOption,
    		responseData,
    		hasVoted,
    		errorMessage,
    		loadingError,
    		isLoading,
    		shareMessage,
    		submitVotes,
    		goToResults,
    		sharePoll
    	});

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(11, id = $$props.id);
    		if ('pollData' in $$props) $$invalidate(0, pollData = $$props.pollData);
    		if ('selectedOption' in $$props) $$invalidate(1, selectedOption = $$props.selectedOption);
    		if ('responseData' in $$props) $$invalidate(2, responseData = $$props.responseData);
    		if ('hasVoted' in $$props) $$invalidate(3, hasVoted = $$props.hasVoted);
    		if ('errorMessage' in $$props) $$invalidate(4, errorMessage = $$props.errorMessage);
    		if ('loadingError' in $$props) $$invalidate(5, loadingError = $$props.loadingError);
    		if ('isLoading' in $$props) $$invalidate(6, isLoading = $$props.isLoading);
    		if ('shareMessage' in $$props) $$invalidate(7, shareMessage = $$props.shareMessage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		pollData,
    		selectedOption,
    		responseData,
    		hasVoted,
    		errorMessage,
    		loadingError,
    		isLoading,
    		shareMessage,
    		submitVotes,
    		goToResults,
    		sharePoll,
    		id,
    		click_handler,
    		input_change_handler,
    		$$binding_groups
    	];
    }

    class ViewPoll extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { id: 11 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ViewPoll",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get id() {
    		throw new Error("<ViewPoll>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<ViewPoll>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/PollResults.svelte generated by Svelte v3.59.2 */
    const file$4 = "src/PollResults.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[10] = i;
    	return child_ctx;
    }

    // (173:2) {:else}
    function create_else_block_1(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				class: "loading-card",
    				shadow: "lg",
    				radius: "lg",
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(173:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (59:2) {#if pollData}
    function create_if_block$1(ctx) {
    	let card;
    	let current;

    	card = new Card({
    			props: {
    				class: "results-card",
    				shadow: "xl",
    				radius: "lg",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(card.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const card_changes = {};

    			if (dirty & /*$$scope, totalVotes, pollData, shareMessage*/ 2055) {
    				card_changes.$$scope = { dirty, ctx };
    			}

    			card.$set(card_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(59:2) {#if pollData}",
    		ctx
    	});

    	return block;
    }

    // (177:8) <Text size="xl" weight="500" color="dimmed">
    function create_default_slot_15(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Loading poll results...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15.name,
    		type: "slot",
    		source: "(177:8) <Text size=\\\"xl\\\" weight=\\\"500\\\" color=\\\"dimmed\\\">",
    		ctx
    	});

    	return block;
    }

    // (174:4) <Card class="loading-card" shadow="lg" radius="lg">
    function create_default_slot_14(ctx) {
    	let div1;
    	let div0;
    	let t;
    	let text_1;
    	let current;

    	text_1 = new Text$1({
    			props: {
    				size: "xl",
    				weight: "500",
    				color: "dimmed",
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = space();
    			create_component(text_1.$$.fragment);
    			attr_dev(div0, "class", "loading-spinner svelte-1tkqyrg");
    			add_location(div0, file$4, 175, 8, 5260);
    			attr_dev(div1, "class", "loading-content svelte-1tkqyrg");
    			add_location(div1, file$4, 174, 6, 5222);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t);
    			mount_component(text_1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(174:4) <Card class=\\\"loading-card\\\" shadow=\\\"lg\\\" radius=\\\"lg\\\">",
    		ctx
    	});

    	return block;
    }

    // (65:12) <Badge variant="gradient" gradient={{ from: 'green', to: 'teal' }} size="lg">
    function create_default_slot_13(ctx) {
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			t0 = text("📊 ");
    			t1 = text(/*totalVotes*/ ctx[1]);
    			t2 = text(" total votes");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*totalVotes*/ 2) set_data_dev(t1, /*totalVotes*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(65:12) <Badge variant=\\\"gradient\\\" gradient={{ from: 'green', to: 'teal' }} size=\\\"lg\\\">",
    		ctx
    	});

    	return block;
    }

    // (68:12) <Badge variant="light" color="blue" size="md">
    function create_default_slot_12(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Live Results");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(68:12) <Badge variant=\\\"light\\\" color=\\\"blue\\\" size=\\\"md\\\">",
    		ctx
    	});

    	return block;
    }

    // (75:10) <Button             variant="gradient"             gradient={{ from: 'teal', to: 'blue' }}             size="sm"             radius="xl"             on:click={sharePoll}           >
    function create_default_slot_11(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Share");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(75:10) <Button             variant=\\\"gradient\\\"             gradient={{ from: 'teal', to: 'blue' }}             size=\\\"sm\\\"             radius=\\\"xl\\\"             on:click={sharePoll}           >",
    		ctx
    	});

    	return block;
    }

    // (84:10) <Button             variant="subtle"             size="sm"             on:click={goBackToPoll}           >
    function create_default_slot_10(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("← Back to Poll");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(84:10) <Button             variant=\\\"subtle\\\"             size=\\\"sm\\\"             on:click={goBackToPoll}           >",
    		ctx
    	});

    	return block;
    }

    // (74:8) <Group class="header-actions">
    function create_default_slot_9(ctx) {
    	let button0;
    	let t;
    	let button1;
    	let current;

    	button0 = new Button$1({
    			props: {
    				variant: "gradient",
    				gradient: { from: 'teal', to: 'blue' },
    				size: "sm",
    				radius: "xl",
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", /*sharePoll*/ ctx[4]);

    	button1 = new Button$1({
    			props: {
    				variant: "subtle",
    				size: "sm",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*goBackToPoll*/ ctx[3]);

    	const block = {
    		c: function create() {
    			create_component(button0.$$.fragment);
    			t = space();
    			create_component(button1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(button1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(button1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(74:8) <Group class=\\\"header-actions\\\">",
    		ctx
    	});

    	return block;
    }

    // (94:6) {#if shareMessage}
    function create_if_block_5(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let text_1;
    	let current;

    	text_1 = new Text$1({
    			props: {
    				size: "sm",
    				weight: "500",
    				color: "teal",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "✅";
    			t1 = space();
    			create_component(text_1.$$.fragment);
    			attr_dev(div0, "class", "notification-icon svelte-1tkqyrg");
    			add_location(div0, file$4, 95, 10, 2367);
    			attr_dev(div1, "class", "share-notification svelte-1tkqyrg");
    			add_location(div1, file$4, 94, 8, 2324);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);
    			mount_component(text_1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope, shareMessage*/ 2052) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(94:6) {#if shareMessage}",
    		ctx
    	});

    	return block;
    }

    // (97:10) <Text size="sm" weight="500" color="teal">
    function create_default_slot_8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*shareMessage*/ ctx[2]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*shareMessage*/ 4) set_data_dev(t, /*shareMessage*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(97:10) <Text size=\\\"sm\\\" weight=\\\"500\\\" color=\\\"teal\\\">",
    		ctx
    	});

    	return block;
    }

    // (113:18) {:else}
    function create_else_block(ctx) {
    	let t0;
    	let t1_value = /*index*/ ctx[10] + 1 + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("#");
    			t1 = text(t1_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pollData*/ 1 && t1_value !== (t1_value = /*index*/ ctx[10] + 1 + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(113:18) {:else}",
    		ctx
    	});

    	return block;
    }

    // (111:62) 
    function create_if_block_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("🥉");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(111:62) ",
    		ctx
    	});

    	return block;
    }

    // (109:62) 
    function create_if_block_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("🥈");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(109:62) ",
    		ctx
    	});

    	return block;
    }

    // (107:18) {#if index === 0 && response.votes > 0}
    function create_if_block_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("🏆");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(107:18) {#if index === 0 && response.votes > 0}",
    		ctx
    	});

    	return block;
    }

    // (118:18) <Text size="lg" weight="600" class="option-text">
    function create_default_slot_7(ctx) {
    	let t_value = /*response*/ ctx[8].text + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pollData*/ 1 && t_value !== (t_value = /*response*/ ctx[8].text + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(118:18) <Text size=\\\"lg\\\" weight=\\\"600\\\" class=\\\"option-text\\\">",
    		ctx
    	});

    	return block;
    }

    // (122:20) <Text size="sm" color="dimmed">
    function create_default_slot_6(ctx) {
    	let t0_value = /*response*/ ctx[8].votes + "";
    	let t0;
    	let t1;
    	let t2_value = (/*response*/ ctx[8].votes === 1 ? 'vote' : 'votes') + "";
    	let t2;

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pollData*/ 1 && t0_value !== (t0_value = /*response*/ ctx[8].votes + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*pollData*/ 1 && t2_value !== (t2_value = (/*response*/ ctx[8].votes === 1 ? 'vote' : 'votes') + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(122:20) <Text size=\\\"sm\\\" color=\\\"dimmed\\\">",
    		ctx
    	});

    	return block;
    }

    // (125:20) <Text size="md" weight="700" class="percentage">
    function create_default_slot_5$1(ctx) {
    	let t0_value = (/*totalVotes*/ ctx[1] > 0
    	? Math.round(/*response*/ ctx[8].votes / /*totalVotes*/ ctx[1] * 100)
    	: 0) + "";

    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			t1 = text("%");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*totalVotes, pollData*/ 3 && t0_value !== (t0_value = (/*totalVotes*/ ctx[1] > 0
    			? Math.round(/*response*/ ctx[8].votes / /*totalVotes*/ ctx[1] * 100)
    			: 0) + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(125:20) <Text size=\\\"md\\\" weight=\\\"700\\\" class=\\\"percentage\\\">",
    		ctx
    	});

    	return block;
    }

    // (103:10) {#each pollData.responses.sort((a, b) => b.votes - a.votes) as response, index (response.id)}
    function create_each_block(key_1, ctx) {
    	let div7;
    	let div3;
    	let div0;
    	let t0;
    	let div2;
    	let text0;
    	let t1;
    	let div1;
    	let text1;
    	let t2;
    	let text2;
    	let t3;
    	let div6;
    	let div5;
    	let div4;
    	let t4;
    	let current;

    	function select_block_type_1(ctx, dirty) {
    		if (/*index*/ ctx[10] === 0 && /*response*/ ctx[8].votes > 0) return create_if_block_2;
    		if (/*index*/ ctx[10] === 1 && /*response*/ ctx[8].votes > 0) return create_if_block_3;
    		if (/*index*/ ctx[10] === 2 && /*response*/ ctx[8].votes > 0) return create_if_block_4;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	text0 = new Text$1({
    			props: {
    				size: "lg",
    				weight: "600",
    				class: "option-text",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	text1 = new Text$1({
    			props: {
    				size: "sm",
    				color: "dimmed",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	text2 = new Text$1({
    			props: {
    				size: "md",
    				weight: "700",
    				class: "percentage",
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div7 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			if_block.c();
    			t0 = space();
    			div2 = element("div");
    			create_component(text0.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			create_component(text1.$$.fragment);
    			t2 = space();
    			create_component(text2.$$.fragment);
    			t3 = space();
    			div6 = element("div");
    			div5 = element("div");
    			div4 = element("div");
    			t4 = space();
    			attr_dev(div0, "class", "result-ranking svelte-1tkqyrg");
    			add_location(div0, file$4, 105, 16, 2828);
    			attr_dev(div1, "class", "vote-count svelte-1tkqyrg");
    			add_location(div1, file$4, 120, 18, 3406);
    			attr_dev(div2, "class", "result-text svelte-1tkqyrg");
    			add_location(div2, file$4, 116, 16, 3232);
    			attr_dev(div3, "class", "result-header svelte-1tkqyrg");
    			add_location(div3, file$4, 104, 14, 2784);
    			attr_dev(div4, "class", "progress-shimmer svelte-1tkqyrg");
    			add_location(div4, file$4, 137, 18, 4175);
    			attr_dev(div5, "class", "progress-bar svelte-1tkqyrg");

    			set_style(div5, "width", (/*totalVotes*/ ctx[1] > 0
    			? /*response*/ ctx[8].votes / /*totalVotes*/ ctx[1] * 100
    			: 0) + "%");

    			toggle_class(div5, "winner-bar", /*index*/ ctx[10] === 0 && /*response*/ ctx[8].votes > 0);
    			add_location(div5, file$4, 132, 16, 3930);
    			attr_dev(div6, "class", "progress-container svelte-1tkqyrg");
    			add_location(div6, file$4, 131, 14, 3881);
    			attr_dev(div7, "class", "result-item svelte-1tkqyrg");
    			toggle_class(div7, "winner", /*index*/ ctx[10] === 0 && /*response*/ ctx[8].votes > 0);
    			add_location(div7, file$4, 103, 12, 2695);
    			this.first = div7;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div3);
    			append_dev(div3, div0);
    			if_block.m(div0, null);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			mount_component(text0, div2, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			mount_component(text1, div1, null);
    			append_dev(div1, t2);
    			mount_component(text2, div1, null);
    			append_dev(div7, t3);
    			append_dev(div7, div6);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div7, t4);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			}

    			const text0_changes = {};

    			if (dirty & /*$$scope, pollData*/ 2049) {
    				text0_changes.$$scope = { dirty, ctx };
    			}

    			text0.$set(text0_changes);
    			const text1_changes = {};

    			if (dirty & /*$$scope, pollData*/ 2049) {
    				text1_changes.$$scope = { dirty, ctx };
    			}

    			text1.$set(text1_changes);
    			const text2_changes = {};

    			if (dirty & /*$$scope, totalVotes, pollData*/ 2051) {
    				text2_changes.$$scope = { dirty, ctx };
    			}

    			text2.$set(text2_changes);

    			if (!current || dirty & /*totalVotes, pollData*/ 3) {
    				set_style(div5, "width", (/*totalVotes*/ ctx[1] > 0
    				? /*response*/ ctx[8].votes / /*totalVotes*/ ctx[1] * 100
    				: 0) + "%");
    			}

    			if (!current || dirty & /*pollData*/ 1) {
    				toggle_class(div5, "winner-bar", /*index*/ ctx[10] === 0 && /*response*/ ctx[8].votes > 0);
    			}

    			if (!current || dirty & /*pollData*/ 1) {
    				toggle_class(div7, "winner", /*index*/ ctx[10] === 0 && /*response*/ ctx[8].votes > 0);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text0.$$.fragment, local);
    			transition_in(text1.$$.fragment, local);
    			transition_in(text2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text0.$$.fragment, local);
    			transition_out(text1.$$.fragment, local);
    			transition_out(text2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			if_block.d();
    			destroy_component(text0);
    			destroy_component(text1);
    			destroy_component(text2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(103:10) {#each pollData.responses.sort((a, b) => b.votes - a.votes) as response, index (response.id)}",
    		ctx
    	});

    	return block;
    }

    // (145:8) {#if totalVotes === 0}
    function create_if_block_1(ctx) {
    	let div1;
    	let div0;
    	let t1;
    	let text0;
    	let t2;
    	let text1;
    	let t3;
    	let button;
    	let current;

    	text0 = new Text$1({
    			props: {
    				size: "xl",
    				weight: "500",
    				color: "dimmed",
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	text1 = new Text$1({
    			props: {
    				size: "md",
    				color: "dimmed",
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button = new Button$1({
    			props: {
    				variant: "gradient",
    				gradient: { from: 'blue', to: 'purple' },
    				size: "lg",
    				class: "vote-now-btn",
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*goBackToPoll*/ ctx[3]);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "🗳️";
    			t1 = space();
    			create_component(text0.$$.fragment);
    			t2 = space();
    			create_component(text1.$$.fragment);
    			t3 = space();
    			create_component(button.$$.fragment);
    			attr_dev(div0, "class", "no-votes-icon svelte-1tkqyrg");
    			add_location(div0, file$4, 146, 12, 4385);
    			attr_dev(div1, "class", "no-votes svelte-1tkqyrg");
    			add_location(div1, file$4, 145, 10, 4350);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t1);
    			mount_component(text0, div1, null);
    			append_dev(div1, t2);
    			mount_component(text1, div1, null);
    			append_dev(div1, t3);
    			mount_component(button, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text0_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				text0_changes.$$scope = { dirty, ctx };
    			}

    			text0.$set(text0_changes);
    			const text1_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				text1_changes.$$scope = { dirty, ctx };
    			}

    			text1.$set(text1_changes);
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text0.$$.fragment, local);
    			transition_in(text1.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text0.$$.fragment, local);
    			transition_out(text1.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(text0);
    			destroy_component(text1);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(145:8) {#if totalVotes === 0}",
    		ctx
    	});

    	return block;
    }

    // (148:12) <Text size="xl" weight="500" color="dimmed">
    function create_default_slot_4$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("No votes yet!");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(148:12) <Text size=\\\"xl\\\" weight=\\\"500\\\" color=\\\"dimmed\\\">",
    		ctx
    	});

    	return block;
    }

    // (151:12) <Text size="md" color="dimmed">
    function create_default_slot_3$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Be the first to vote on this poll.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(151:12) <Text size=\\\"md\\\" color=\\\"dimmed\\\">",
    		ctx
    	});

    	return block;
    }

    // (154:12) <Button               variant="gradient"               gradient={{ from: 'blue', to: 'purple' }}               size="lg"               on:click={goBackToPoll}               class="vote-now-btn"             >
    function create_default_slot_2$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("🗳️ Vote Now");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(154:12) <Button               variant=\\\"gradient\\\"               gradient={{ from: 'blue', to: 'purple' }}               size=\\\"lg\\\"               on:click={goBackToPoll}               class=\\\"vote-now-btn\\\"             >",
    		ctx
    	});

    	return block;
    }

    // (167:10) <Text size="xs" color="dimmed" align="center">
    function create_default_slot_1$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Results update automatically every 5 seconds");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(167:10) <Text size=\\\"xs\\\" color=\\\"dimmed\\\" align=\\\"center\\\">",
    		ctx
    	});

    	return block;
    }

    // (60:4) <Card class="results-card" shadow="xl" radius="lg">
    function create_default_slot$3(ctx) {
    	let div2;
    	let div1;
    	let h1;
    	let t0_value = /*pollData*/ ctx[0].question + "";
    	let t0;
    	let t1;
    	let div0;
    	let badge0;
    	let t2;
    	let badge1;
    	let t3;
    	let group;
    	let t4;
    	let t5;
    	let div5;
    	let div3;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t6;
    	let t7;
    	let div4;
    	let text_1;
    	let current;

    	badge0 = new Badge$1({
    			props: {
    				variant: "gradient",
    				gradient: { from: 'green', to: 'teal' },
    				size: "lg",
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	badge1 = new Badge$1({
    			props: {
    				variant: "light",
    				color: "blue",
    				size: "md",
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	group = new Group$1({
    			props: {
    				class: "header-actions",
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block0 = /*shareMessage*/ ctx[2] && create_if_block_5(ctx);
    	let each_value = /*pollData*/ ctx[0].responses.sort(func);
    	validate_each_argument(each_value);
    	const get_key = ctx => /*response*/ ctx[8].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	let if_block1 = /*totalVotes*/ ctx[1] === 0 && create_if_block_1(ctx);

    	text_1 = new Text$1({
    			props: {
    				size: "xs",
    				color: "dimmed",
    				align: "center",
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			create_component(badge0.$$.fragment);
    			t2 = space();
    			create_component(badge1.$$.fragment);
    			t3 = space();
    			create_component(group.$$.fragment);
    			t4 = space();
    			if (if_block0) if_block0.c();
    			t5 = space();
    			div5 = element("div");
    			div3 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t6 = space();
    			if (if_block1) if_block1.c();
    			t7 = space();
    			div4 = element("div");
    			create_component(text_1.$$.fragment);
    			attr_dev(h1, "class", "poll-question svelte-1tkqyrg");
    			add_location(h1, file$4, 62, 10, 1440);
    			attr_dev(div0, "class", "poll-stats svelte-1tkqyrg");
    			add_location(div0, file$4, 63, 10, 1501);
    			attr_dev(div1, "class", "header-content svelte-1tkqyrg");
    			add_location(div1, file$4, 61, 8, 1401);
    			attr_dev(div2, "class", "results-header svelte-1tkqyrg");
    			add_location(div2, file$4, 60, 6, 1364);
    			attr_dev(div3, "class", "results-grid svelte-1tkqyrg");
    			add_location(div3, file$4, 101, 8, 2552);
    			attr_dev(div4, "class", "results-footer svelte-1tkqyrg");
    			add_location(div4, file$4, 165, 8, 4949);
    			attr_dev(div5, "class", "results-content svelte-1tkqyrg");
    			add_location(div5, file$4, 100, 6, 2514);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, h1);
    			append_dev(h1, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			mount_component(badge0, div0, null);
    			append_dev(div0, t2);
    			mount_component(badge1, div0, null);
    			append_dev(div2, t3);
    			mount_component(group, div2, null);
    			insert_dev(target, t4, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div3, null);
    				}
    			}

    			append_dev(div5, t6);
    			if (if_block1) if_block1.m(div5, null);
    			append_dev(div5, t7);
    			append_dev(div5, div4);
    			mount_component(text_1, div4, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*pollData*/ 1) && t0_value !== (t0_value = /*pollData*/ ctx[0].question + "")) set_data_dev(t0, t0_value);
    			const badge0_changes = {};

    			if (dirty & /*$$scope, totalVotes*/ 2050) {
    				badge0_changes.$$scope = { dirty, ctx };
    			}

    			badge0.$set(badge0_changes);
    			const badge1_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				badge1_changes.$$scope = { dirty, ctx };
    			}

    			badge1.$set(badge1_changes);
    			const group_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				group_changes.$$scope = { dirty, ctx };
    			}

    			group.$set(group_changes);

    			if (/*shareMessage*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*shareMessage*/ 4) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_5(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t5.parentNode, t5);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*pollData, totalVotes, Math*/ 3) {
    				each_value = /*pollData*/ ctx[0].responses.sort(func);
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div3, outro_and_destroy_block, create_each_block, null, get_each_context);
    				check_outros();
    			}

    			if (/*totalVotes*/ ctx[1] === 0) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*totalVotes*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div5, t7);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const text_1_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(badge0.$$.fragment, local);
    			transition_in(badge1.$$.fragment, local);
    			transition_in(group.$$.fragment, local);
    			transition_in(if_block0);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(if_block1);
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(badge0.$$.fragment, local);
    			transition_out(badge1.$$.fragment, local);
    			transition_out(group.$$.fragment, local);
    			transition_out(if_block0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(if_block1);
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(badge0);
    			destroy_component(badge1);
    			destroy_component(group);
    			if (detaching) detach_dev(t4);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div5);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (if_block1) if_block1.d();
    			destroy_component(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(60:4) <Card class=\\\"results-card\\\" shadow=\\\"xl\\\" radius=\\\"lg\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*pollData*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "results-container svelte-1tkqyrg");
    			add_location(div, file$4, 57, 0, 1253);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = (a, b) => b.votes - a.votes;

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PollResults', slots, []);
    	let { id } = $$props;
    	let pollData = null;
    	let totalVotes = 0;
    	let intervalId;
    	let shareMessage = "";

    	function goBackToPoll() {
    		navigate(`/polls/${id}`);
    	}

    	async function sharePoll() {
    		try {
    			const pollUrl = window.location.origin + `/polls/${id}`;
    			await navigator.clipboard.writeText(pollUrl);
    			$$invalidate(2, shareMessage = "Poll link copied to clipboard!");
    			setTimeout(() => $$invalidate(2, shareMessage = ""), 3000);
    		} catch(error) {
    			$$invalidate(2, shareMessage = "Failed to copy link. Please copy the URL manually.");
    			setTimeout(() => $$invalidate(2, shareMessage = ""), 5000);
    		}
    	}

    	const fetchPollResults = async () => {
    		const response = await fetch(`/api/${id}`);
    		const data = await response.json();
    		$$invalidate(0, pollData = data.poll);
    		let responseVotes = 0;

    		for (let response of pollData.responses) {
    			responseVotes = responseVotes += response.votes;
    		}

    		if (responseVotes > totalVotes) {
    			$$invalidate(1, totalVotes = responseVotes);
    		}
    	};

    	onMount(() => {
    		fetchPollResults();
    		intervalId = setInterval(fetchPollResults, 5000);
    	});

    	onDestroy(() => {
    		clearInterval(intervalId);
    	});

    	$$self.$$.on_mount.push(function () {
    		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
    			console.warn("<PollResults> was created without expected prop 'id'");
    		}
    	});

    	const writable_props = ['id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PollResults> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(5, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		Stack: Stack$1,
    		Text: Text$1,
    		Progress: Progress$1,
    		Card,
    		Badge: Badge$1,
    		Button: Button$1,
    		Group: Group$1,
    		ActionIcon: ActionIcon$1,
    		navigate,
    		id,
    		pollData,
    		totalVotes,
    		intervalId,
    		shareMessage,
    		goBackToPoll,
    		sharePoll,
    		fetchPollResults
    	});

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(5, id = $$props.id);
    		if ('pollData' in $$props) $$invalidate(0, pollData = $$props.pollData);
    		if ('totalVotes' in $$props) $$invalidate(1, totalVotes = $$props.totalVotes);
    		if ('intervalId' in $$props) intervalId = $$props.intervalId;
    		if ('shareMessage' in $$props) $$invalidate(2, shareMessage = $$props.shareMessage);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pollData, totalVotes, shareMessage, goBackToPoll, sharePoll, id];
    }

    class PollResults extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { id: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PollResults",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get id() {
    		throw new Error("<PollResults>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<PollResults>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/HeadContent.svelte generated by Svelte v3.59.2 */
    const file$3 = "src/HeadContent.svelte";

    // (24:6) {#if showCreateButton}
    function create_if_block(ctx) {
    	let button;
    	let current;

    	button = new Button$1({
    			props: {
    				variant: "subtle",
    				size: "sm",
    				radius: "xl",
    				component: "a",
    				href: "/",
    				class: "nav-button",
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(24:6) {#if showCreateButton}",
    		ctx
    	});

    	return block;
    }

    // (25:8) <Button            variant="subtle"            size="sm"           radius="xl"           component="a"           href="/"           class="nav-button"         >
    function create_default_slot$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Create Poll");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(25:8) <Button            variant=\\\"subtle\\\"            size=\\\"sm\\\"           radius=\\\"xl\\\"           component=\\\"a\\\"           href=\\\"/\\\"           class=\\\"nav-button\\\"         >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div5;
    	let div4;
    	let div2;
    	let a;
    	let div0;
    	let t1;
    	let div1;
    	let span0;
    	let t3;
    	let span1;
    	let t5;
    	let div3;
    	let current;
    	let if_block = /*showCreateButton*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			div2 = element("div");
    			a = element("a");
    			div0 = element("div");
    			div0.textContent = "🐻‍❄️";
    			t1 = space();
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "Poller Bear";
    			t3 = space();
    			span1 = element("span");
    			span1.textContent = "Quick Polls, Real Results";
    			t5 = space();
    			div3 = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "brand-icon svelte-t9j8f2");
    			add_location(div0, file$3, 14, 8, 477);
    			attr_dev(span0, "class", "brand-name svelte-t9j8f2");
    			add_location(span0, file$3, 16, 10, 556);
    			attr_dev(span1, "class", "brand-tagline svelte-t9j8f2");
    			add_location(span1, file$3, 17, 10, 610);
    			attr_dev(div1, "class", "brand-text svelte-t9j8f2");
    			add_location(div1, file$3, 15, 8, 521);
    			attr_dev(a, "href", "/");
    			attr_dev(a, "class", "brand-link svelte-t9j8f2");
    			add_location(a, file$3, 13, 6, 437);
    			attr_dev(div2, "class", "brand-section svelte-t9j8f2");
    			add_location(div2, file$3, 12, 4, 403);
    			attr_dev(div3, "class", "header-actions svelte-t9j8f2");
    			add_location(div3, file$3, 22, 4, 717);
    			attr_dev(div4, "class", "header-container svelte-t9j8f2");
    			add_location(div4, file$3, 11, 2, 368);
    			attr_dev(div5, "class", "modern-header svelte-t9j8f2");
    			add_location(div5, file$3, 10, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div2);
    			append_dev(div2, a);
    			append_dev(a, div0);
    			append_dev(a, t1);
    			append_dev(a, div1);
    			append_dev(div1, span0);
    			append_dev(div1, t3);
    			append_dev(div1, span1);
    			append_dev(div4, t5);
    			append_dev(div4, div3);
    			if (if_block) if_block.m(div3, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*showCreateButton*/ ctx[0]) {
    				if (if_block) {
    					if (dirty & /*showCreateButton*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div3, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let showCreateButton;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HeadContent', slots, []);
    	const location = useLocation();
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(2, $location = value));
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HeadContent> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Header: Header$1,
    		Group: Group$1,
    		Button: Button$1,
    		useLocation,
    		location,
    		showCreateButton,
    		$location
    	});

    	$$self.$inject_state = $$props => {
    		if ('showCreateButton' in $$props) $$invalidate(0, showCreateButton = $$props.showCreateButton);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$location*/ 4) {
    			// Show Create Poll button only on poll pages (/polls/id or /polls/id/r)
    			$$invalidate(0, showCreateButton = $location && $location.pathname
    			? $location.pathname.startsWith('/polls/')
    			: false);
    		}
    	};

    	return [showCreateButton, location, $location];
    }

    class HeadContent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HeadContent",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* ../node_modules/radix-icons-svelte/Icons/GithubLogo.svelte generated by Svelte v3.59.2 */

    const file$2 = "../node_modules/radix-icons-svelte/Icons/GithubLogo.svelte";

    function create_fragment$2(ctx) {
    	let svg;
    	let path;

    	let svg_levels = [
    		{ width: /*size*/ ctx[1] },
    		{ height: /*size*/ ctx[1] },
    		{ viewBox: "0 0 15 15" },
    		{ fill: "none" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		/*$$restProps*/ ctx[2]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "clip-rule", "evenodd");
    			attr_dev(path, "d", "M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z");
    			attr_dev(path, "fill", /*color*/ ctx[0]);
    			add_location(path, file$2, 13, 1, 204);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$2, 5, 0, 79);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*color*/ 1) {
    				attr_dev(path, "fill", /*color*/ ctx[0]);
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				dirty & /*size*/ 2 && { width: /*size*/ ctx[1] },
    				dirty & /*size*/ 2 && { height: /*size*/ ctx[1] },
    				{ viewBox: "0 0 15 15" },
    				{ fill: "none" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	const omit_props_names = ["color","size"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GithubLogo', slots, []);
    	let { color = 'currentColor' } = $$props;
    	let { size = 15 } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('color' in $$new_props) $$invalidate(0, color = $$new_props.color);
    		if ('size' in $$new_props) $$invalidate(1, size = $$new_props.size);
    	};

    	$$self.$capture_state = () => ({ color, size });

    	$$self.$inject_state = $$new_props => {
    		if ('color' in $$props) $$invalidate(0, color = $$new_props.color);
    		if ('size' in $$props) $$invalidate(1, size = $$new_props.size);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [color, size, $$restProps];
    }

    class GithubLogo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { color: 0, size: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GithubLogo",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get color() {
    		throw new Error("<GithubLogo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<GithubLogo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<GithubLogo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<GithubLogo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var GithubLogo$1 = GithubLogo;

    /* src/Footer.svelte generated by Svelte v3.59.2 */
    const file$1 = "src/Footer.svelte";

    // (14:8) <Text size="sm" color="dimmed" class="footer-description">
    function create_default_slot_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Create polls in seconds, get results instantly. Simple, fast polling for everyone.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(14:8) <Text size=\\\"sm\\\" color=\\\"dimmed\\\" class=\\\"footer-description\\\">",
    		ctx
    	});

    	return block;
    }

    // (22:12) <Button               variant="subtle"               size="sm"               leftIcon={GithubLogo}               component="a"               href="https://www.github.com/SteveHNH/poller-bear"               target="_blank"               class="github-button"             >
    function create_default_slot_4$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("GitHub");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(22:12) <Button               variant=\\\"subtle\\\"               size=\\\"sm\\\"               leftIcon={GithubLogo}               component=\\\"a\\\"               href=\\\"https://www.github.com/SteveHNH/poller-bear\\\"               target=\\\"_blank\\\"               class=\\\"github-button\\\"             >",
    		ctx
    	});

    	return block;
    }

    // (33:12) <Button               variant="subtle"               size="sm"               component="a"               href="https://ko-fi.com/F1F61IKDJT"               target="_blank"               class="kofi-button"             >
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("☕ Buy me a coffee");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(33:12) <Button               variant=\\\"subtle\\\"               size=\\\"sm\\\"               component=\\\"a\\\"               href=\\\"https://ko-fi.com/F1F61IKDJT\\\"               target=\\\"_blank\\\"               class=\\\"kofi-button\\\"             >",
    		ctx
    	});

    	return block;
    }

    // (21:10) <Group spacing="md">
    function create_default_slot_2$1(ctx) {
    	let button0;
    	let t;
    	let button1;
    	let current;

    	button0 = new Button$1({
    			props: {
    				variant: "subtle",
    				size: "sm",
    				leftIcon: GithubLogo$1,
    				component: "a",
    				href: "https://www.github.com/SteveHNH/poller-bear",
    				target: "_blank",
    				class: "github-button",
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button$1({
    			props: {
    				variant: "subtle",
    				size: "sm",
    				component: "a",
    				href: "https://ko-fi.com/F1F61IKDJT",
    				target: "_blank",
    				class: "kofi-button",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button0.$$.fragment);
    			t = space();
    			create_component(button1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(button1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(button1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(21:10) <Group spacing=\\\"md\\\">",
    		ctx
    	});

    	return block;
    }

    // (51:8) <Text size="xs" color="dimmed">
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("© 2025 Poller Bear");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(51:8) <Text size=\\\"xs\\\" color=\\\"dimmed\\\">",
    		ctx
    	});

    	return block;
    }

    // (54:8) <Text size="xs" color="dimmed">
    function create_default_slot$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Open source. Patches welcome.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(54:8) <Text size=\\\"xs\\\" color=\\\"dimmed\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let footer;
    	let div8;
    	let div4;
    	let div1;
    	let div0;
    	let span0;
    	let t1;
    	let span1;
    	let t3;
    	let text0;
    	let t4;
    	let div3;
    	let div2;
    	let group;
    	let t5;
    	let div7;
    	let div5;
    	let t6;
    	let div6;
    	let text1;
    	let t7;
    	let text2;
    	let current;

    	text0 = new Text$1({
    			props: {
    				size: "sm",
    				color: "dimmed",
    				class: "footer-description",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	group = new Group$1({
    			props: {
    				spacing: "md",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	text1 = new Text$1({
    			props: {
    				size: "xs",
    				color: "dimmed",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	text2 = new Text$1({
    			props: {
    				size: "xs",
    				color: "dimmed",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div8 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "🐻‍❄️";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "Poller Bear";
    			t3 = space();
    			create_component(text0.$$.fragment);
    			t4 = space();
    			div3 = element("div");
    			div2 = element("div");
    			create_component(group.$$.fragment);
    			t5 = space();
    			div7 = element("div");
    			div5 = element("div");
    			t6 = space();
    			div6 = element("div");
    			create_component(text1.$$.fragment);
    			t7 = space();
    			create_component(text2.$$.fragment);
    			attr_dev(span0, "class", "footer-icon svelte-1a2ohzy");
    			add_location(span0, file$1, 10, 10, 300);
    			attr_dev(span1, "class", "footer-name svelte-1a2ohzy");
    			add_location(span1, file$1, 11, 10, 349);
    			attr_dev(div0, "class", "footer-logo svelte-1a2ohzy");
    			add_location(div0, file$1, 9, 8, 264);
    			attr_dev(div1, "class", "footer-brand svelte-1a2ohzy");
    			add_location(div1, file$1, 8, 6, 229);
    			attr_dev(div2, "class", "links-section svelte-1a2ohzy");
    			add_location(div2, file$1, 19, 8, 640);
    			attr_dev(div3, "class", "footer-links svelte-1a2ohzy");
    			add_location(div3, file$1, 18, 6, 605);
    			attr_dev(div4, "class", "footer-content svelte-1a2ohzy");
    			add_location(div4, file$1, 7, 4, 194);
    			attr_dev(div5, "class", "footer-divider svelte-1a2ohzy");
    			add_location(div5, file$1, 48, 6, 1408);
    			attr_dev(div6, "class", "bottom-content svelte-1a2ohzy");
    			add_location(div6, file$1, 49, 6, 1449);
    			attr_dev(div7, "class", "footer-bottom svelte-1a2ohzy");
    			add_location(div7, file$1, 47, 4, 1374);
    			attr_dev(div8, "class", "footer-container svelte-1a2ohzy");
    			add_location(div8, file$1, 6, 2, 159);
    			attr_dev(footer, "class", "modern-footer svelte-1a2ohzy");
    			add_location(footer, file$1, 5, 0, 126);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div8);
    			append_dev(div8, div4);
    			append_dev(div4, div1);
    			append_dev(div1, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div0, span1);
    			append_dev(div1, t3);
    			mount_component(text0, div1, null);
    			append_dev(div4, t4);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			mount_component(group, div2, null);
    			append_dev(div8, t5);
    			append_dev(div8, div7);
    			append_dev(div7, div5);
    			append_dev(div7, t6);
    			append_dev(div7, div6);
    			mount_component(text1, div6, null);
    			append_dev(div6, t7);
    			mount_component(text2, div6, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const text0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				text0_changes.$$scope = { dirty, ctx };
    			}

    			text0.$set(text0_changes);
    			const group_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				group_changes.$$scope = { dirty, ctx };
    			}

    			group.$set(group_changes);
    			const text1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				text1_changes.$$scope = { dirty, ctx };
    			}

    			text1.$set(text1_changes);
    			const text2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				text2_changes.$$scope = { dirty, ctx };
    			}

    			text2.$set(text2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text0.$$.fragment, local);
    			transition_in(group.$$.fragment, local);
    			transition_in(text1.$$.fragment, local);
    			transition_in(text2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text0.$$.fragment, local);
    			transition_out(group.$$.fragment, local);
    			transition_out(text1.$$.fragment, local);
    			transition_out(text2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			destroy_component(text0);
    			destroy_component(group);
    			destroy_component(text1);
    			destroy_component(text2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Button: Button$1, Group: Group$1, Text: Text$1, GithubLogo: GithubLogo$1 });
    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.59.2 */
    const file = "src/App.svelte";

    // (25:10) <Route path="/polls/:id" let:params>
    function create_default_slot_4(ctx) {
    	let viewpoll;
    	let current;

    	viewpoll = new ViewPoll({
    			props: { id: /*params*/ ctx[0].id },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(viewpoll.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(viewpoll, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const viewpoll_changes = {};
    			if (dirty & /*params*/ 1) viewpoll_changes.id = /*params*/ ctx[0].id;
    			viewpoll.$set(viewpoll_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(viewpoll.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(viewpoll.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(viewpoll, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(25:10) <Route path=\\\"/polls/:id\\\" let:params>",
    		ctx
    	});

    	return block;
    }

    // (28:10) <Route path="/polls/:id/r" let:params>
    function create_default_slot_3(ctx) {
    	let pollresults;
    	let current;

    	pollresults = new PollResults({
    			props: { id: /*params*/ ctx[0].id },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(pollresults.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(pollresults, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const pollresults_changes = {};
    			if (dirty & /*params*/ 1) pollresults_changes.id = /*params*/ ctx[0].id;
    			pollresults.$set(pollresults_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pollresults.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pollresults.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(pollresults, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(28:10) <Route path=\\\"/polls/:id/r\\\" let:params>",
    		ctx
    	});

    	return block;
    }

    // (23:8) <Router>
    function create_default_slot_2(ctx) {
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let current;

    	route0 = new Route({
    			props: { path: "/", component: CreatePoll },
    			$$inline: true
    		});

    	route1 = new Route({
    			props: {
    				path: "/polls/:id",
    				$$slots: {
    					default: [
    						create_default_slot_4,
    						({ params }) => ({ 0: params }),
    						({ params }) => params ? 1 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route2 = new Route({
    			props: {
    				path: "/polls/:id/r",
    				$$slots: {
    					default: [
    						create_default_slot_3,
    						({ params }) => ({ 0: params }),
    						({ params }) => params ? 1 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route1_changes = {};

    			if (dirty & /*$$scope, params*/ 3) {
    				route1_changes.$$scope = { dirty, ctx };
    			}

    			route1.$set(route1_changes);
    			const route2_changes = {};

    			if (dirty & /*$$scope, params*/ 3) {
    				route2_changes.$$scope = { dirty, ctx };
    			}

    			route2.$set(route2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(23:8) <Router>",
    		ctx
    	});

    	return block;
    }

    // (22:6) <Container>
    function create_default_slot_1(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const router_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(22:6) <Container>",
    		ctx
    	});

    	return block;
    }

    // (17:0) <SvelteUIProvider withGlobalStyles themeObserver={"dark"}>
    function create_default_slot(ctx) {
    	let div;
    	let headcontent;
    	let t0;
    	let main;
    	let container;
    	let t1;
    	let footer;
    	let current;
    	headcontent = new HeadContent({ $$inline: true });

    	container = new Container$1({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(headcontent.$$.fragment);
    			t0 = space();
    			main = element("main");
    			create_component(container.$$.fragment);
    			t1 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(main, "class", "main-content svelte-59x1ff");
    			add_location(main, file, 20, 4, 531);
    			attr_dev(div, "class", "app-layout svelte-59x1ff");
    			add_location(div, file, 17, 2, 477);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(headcontent, div, null);
    			append_dev(div, t0);
    			append_dev(div, main);
    			mount_component(container, main, null);
    			append_dev(div, t1);
    			mount_component(footer, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const container_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(headcontent.$$.fragment, local);
    			transition_in(container.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(headcontent.$$.fragment, local);
    			transition_out(container.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(headcontent);
    			destroy_component(container);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(17:0) <SvelteUIProvider withGlobalStyles themeObserver={\\\"dark\\\"}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let t;
    	let svelteuiprovider;
    	let current;

    	svelteuiprovider = new SvelteUIProvider$1({
    			props: {
    				withGlobalStyles: true,
    				themeObserver: "dark",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t = space();
    			create_component(svelteuiprovider.$$.fragment);
    			document.title = "Poller Bear";
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			mount_component(svelteuiprovider, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const svelteuiprovider_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				svelteuiprovider_changes.$$scope = { dirty, ctx };
    			}

    			svelteuiprovider.$set(svelteuiprovider_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svelteuiprovider.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svelteuiprovider.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			destroy_component(svelteuiprovider, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Container: Container$1,
    		SvelteUIProvider: SvelteUIProvider$1,
    		Router,
    		Route,
    		CreatePoll,
    		ViewPoll,
    		PollResults,
    		HeadContent,
    		Footer
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.getElementById('app'),
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
