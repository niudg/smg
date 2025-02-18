export default {
  methods: {
    getSpanRows(row, column) {
      let rowAttr = []
      if (row.rowspan >= 1 && column.property == this.combineField) {
        let rowSpan = row.rowspan
        for (var i = row.rowIndex; i < row.rowIndex + rowSpan; i++) {
          rowAttr.push(this.dataSource[i])
        }
      }
      return rowAttr
    },

    /**
     *
     * @param {*} row
     * @param {*} column
     * @returns
     */
    getSpanRowsByMergeCfg(row, column) {
      let rowAttr = []
      let searchKeyList = this.mergeCfg
        .filter((item) => item.searchKey == column.property)
        .map((item) => item.compareKey || [item.searchKey])
      let loop = true
      let rowIndex = row.rowIndex
      if (
        searchKeyList.length > 0 &&
        searchKeyList[0].includes(column.property)
      ) {
        rowAttr.push(row)
        while (loop) {
          rowIndex++
          if (
            searchKeyList[0].every(
              (key) =>
                this.$baseLodash.get(this.dataSource[rowIndex], key) ==
                this.$baseLodash.get(row, key)
            )
          ) {
            rowAttr.push(this.dataSource[rowIndex])
            continue
          }
          break
        }
      }
      return rowAttr
    },

    cellClick(row, column, cell, event) {
      if (!this.isEditCell(row, column)) {
        let rowAttr = []
        if (row.rowspan) {
          rowAttr = this.getSpanRows(row, column)
        }

        if (this.mergeCfg) {
          rowAttr = this.getSpanRowsByMergeCfg(row, column)
        }

        this.$emit('cell-click', {
          row: row,
          column: column,
          cell: cell,
          event: event,
          rowAttr: rowAttr,
        })
        return
      }
      event.stopPropagation()
      this.editX = row.rowIndex
      this.editY = column.property
    },
    isEditCell(row, column) {
      return this.editMap.some(
        (e) => e.x === row.rowIndex && e.y === column.property
      )
    },
    setEditMap(obj) {
      if (this.editMap.some((e) => e.x === obj.x && e.y === obj.y)) return
      this.editMap.push(obj)
    },
  },
  watch: {
    editX(n) {
      if (n !== null) {
        window.addEventListener('click', this.cancelEdit)
      } else {
        window.removeEventListener('click', this.cancelEdit)
      }
    },
  },
}
