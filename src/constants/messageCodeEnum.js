class CodeTextEnum {
  constructor(name) {
    this.name = name
  }
}
const messageCodeEnum = Object.freeze({
  E00000001: new CodeTextEnum('E00000001'), //{0}を入力してください。
  E00000002: new CodeTextEnum('E00000002'), //半角英数字を入力してください。
  E00000003: new CodeTextEnum('E00000003'), //システムエラーが発生しました。システム管理者へ連絡してください。
  I00000004: new CodeTextEnum('I00000004'), //{0}を登録してよろしいですか。
  I00000005: new CodeTextEnum('I00000005'), //一覧画面へ戻ります。よろしいですか？
  E00000006: new CodeTextEnum('E00000006'), //{0}と関連している{1}を入力してください。
  E00000007: new CodeTextEnum('E00000007'), //指定された{0}は{1}に存在しません。
  E00000008: new CodeTextEnum('E00000008'), //正しい日付を設定してください。
  E00000009: new CodeTextEnum('E00000009'), //{0}は{1}よりも後に設定してください。
  E00000010: new CodeTextEnum('E00000010'), //ログオンユーザーには{0}の権限がありません。
  E00000011: new CodeTextEnum('E00000011'), //有効なEメールアドレスを入力してください。
  E00000012: new CodeTextEnum('E00000012'), //有効なURLを入力してください。
  E00000013: new CodeTextEnum('E00000013'), //有効な日付を入力してください。
  E00000014: new CodeTextEnum('E00000014'), //有効な数字を入力してください。
  E00000015: new CodeTextEnum('E00000015'), //数字のみ入力してください。
  E00000016: new CodeTextEnum('E00000016'), //有効なクレジットカード番号を入力してください。
  E00000017: new CodeTextEnum('E00000017'), //同じ値をもう一度入力してください。
  E00000018: new CodeTextEnum('E00000018'), //有効な拡張子を含む値を入力してください。
  E00000019: new CodeTextEnum('E00000019'), //{0} 文字以内で入力してください。
  E00000020: new CodeTextEnum('E00000020'), //{0} 文字以上で入力してください。
  E00000021: new CodeTextEnum('E00000021'), //{0} 文字から {1} 文字までの値を入力してください。
  E00000022: new CodeTextEnum('E00000022'), //{0} から {1} までの値を入力してください。
  E00000023: new CodeTextEnum('E00000023'), //{0} の倍数を入力してください。
  E00000024: new CodeTextEnum('E00000024'), //{0} 以下の値を入力してください。
  E00000025: new CodeTextEnum('E00000025'), //{0} 以上の値を入力してください。
  E00000026: new CodeTextEnum('E00000026'), //{0} ファイルが見つかりませんでした。
  E00000027: new CodeTextEnum('E00000027'), //{0} ファイルを開くことができません。
  I00000403: new CodeTextEnum('I00000403'), //実行結果ファイルが出力されましたので、ご確認をお願いいたします。
  E00000515: new CodeTextEnum('E00000515'), //ファイルサイズは{0}以下にしてください。
  E00000046: new CodeTextEnum('E00000046'), //{0}を選択してください。
  I00000111: new CodeTextEnum('I00000111'), //{0}しました。
  E00000467: new CodeTextEnum('E00000467'), //必須項目です。
  E00000104: new CodeTextEnum('E00000104'), //該当するデータは見つかりませんでした。
  I00000466: new CodeTextEnum('I00000466'), //{0}してよろしいでしょうか？
  I00000414: new CodeTextEnum('I00000414'), //削除が完了しました。
  I00000412: new CodeTextEnum('I00000412'), //削除します。よろしいでしょうか？
  I00000455: new CodeTextEnum('I00000455'), //表示項目設定を保存しました。
  E00000054: new CodeTextEnum('E00000054'), //半角ｶﾅのみ入力可能です。
})
export default messageCodeEnum
