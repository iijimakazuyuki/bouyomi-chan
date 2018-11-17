const net = require('net');

class BouyomiChan {
    /**
     * @param {object} options 棒読みちゃんの設定
     * @param {string} options.host 棒読みちゃんのホスト
     * @param {number} options.port 棒読みちゃんのポート番号
     * @param {number} options.speed 棒読みちゃんの読み上げる速度
     * @param {number} options.tone 棒読みちゃんの読み上げる音程
     * @param {number} options.volume 棒読みちゃんの読み上げる音量
     * @param {number} options.type 棒読みちゃんの読み上げる声質
     *
     */
    constructor(options) {
        if (!options) return;
        /**
         * 棒読みちゃんのホスト
         */
        this.host = 'host' in options ? options.host : 'localhost';
        /**
         * 棒読みちゃんのポート番号
         */
        this.port = 'port' in options ? options.port : 50001;
        /**
         * 速度（-1:棒読みちゃん画面上の設定）
         */
        this.speed = 'port' in options ? options.speed : -1;
        /**
         * 音程（-1:棒読みちゃん画面上の設定）
         */
        this.tone = 'tone' in options ? options.tone : -1;
        /**
         * 音量（-1:棒読みちゃん画面上の設定）
         */
        this.volume = 'volume' in options ? options.volume : -1;
        /**
         * 声質（ 0:棒読みちゃん画面上の設定、1:女性1、2:女性2、3:男性1、4:男性2、5:中性、6:ロボット、7:機械1、8:機械2、10001～:SAPI5）
         */
        this.type = 'type' in options ? options.type : 1;
    }
    /**
     * @param {string} message 棒読みちゃんに読み上げてもらう文章
     * @returns {Promise}
     */
    speak(message) {
        /**
         * 棒読みちゃんに送信する設定のバイト長
         */
        const SETTINGS_BYTES_LENGTH = 15;
        let messageByteLength = Buffer.byteLength(message);
        let bufferLength = SETTINGS_BYTES_LENGTH + messageByteLength;
        let buff = Buffer.alloc(bufferLength);
        /**
         * メッセージ読み上げコマンド
         */
        const COMMAND_TO_SPEAK = 1;
        let len = buff.writeUInt16LE(COMMAND_TO_SPEAK);
        len = buff.writeInt16LE(this.speed, len);
        len = buff.writeInt16LE(this.tone, len);
        len = buff.writeInt16LE(this.volume, len);
        len = buff.writeUInt16LE(this.type, len);
        /**
         * 文字コード(0:UTF-8, 1:Unicode, 2:Shift-JIS)
         */
        const ENCODING = 0;
        len = buff.writeUInt8(ENCODING, len);
        len = buff.writeUInt32LE(messageByteLength, len);
        len = buff.write(message, len);

        let client = net.createConnection(this.port, this.host);
        client.write(buff);
        client.end();
    }
}

module.exports = BouyomiChan;
