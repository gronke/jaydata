import $data, { $C, Guard, Container, Exception } from '../TypeSystem/index.js';
var jQuery = $data.__global['jQuery'];

(function ($data) {
    if (typeof jQuery !== 'undefined') {
        $data.Class.define('$data.Deferred', $data.PromiseHandlerBase, null, {
            constructor: function () {
                this.deferred = new jQuery.Deferred();
            },
            deferred: {},
            createCallback: function (callBack) {
                callBack = $data.typeSystem.createCallbackSetting(callBack);
                var self = this;

                return {
                    success: function () {
                        callBack.success.apply(self.deferred, arguments);
                        self.deferred.resolve.apply(self.deferred, arguments);
                    },
                    error: function () {
                        Array.prototype.push.call(arguments, self.deferred);
                        callBack.error.apply(self.deferred, arguments);
                    },
                    notify: function () {
                        callBack.notify.apply(self.deferred, arguments);
                        self.deferred.notify.apply(self.deferred, arguments);
                    }
                };
            },
            getPromise: function () {
                return this.deferred.promise();
            }
        }, null);

        $data.PromiseHandler = $data.Deferred;
    }
})($data);

export default $data
