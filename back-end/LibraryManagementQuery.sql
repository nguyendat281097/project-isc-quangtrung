---1. Cho biết số lượng sách theo từng đầu sách ( Mã sách, tên sách, số lượng)
---2.Cho biết lịch sử mượn trả của từng độc giả ( Mã độc giả, tên độc giả, tên sách, ngày mượn, số ngày mượn) của từng quyển sách
---3.Cho biết quyển sách có mã 3 code đang được mượn bởi ai (Nhận vào mã 3 code của 1 quyển sách)
---4.Cho biết quyển sách có mã 3 code đã được mượn bởi ai (Nhận vào mã 3 code của 1 quyển sách)
---5.Hiển thị mã sách, tên sách, sắp xếp giảm dần theo số lần mượn


USE LIBRARYMANAGEMENT
GO
---6.Cho biết quyển sách ở trạng thái đang được mượn, người nào cho mượn, ai mượn
SELECT BOT.BOT_name as 'BOOK', LIB.fullName as'LIB', RD.fullName as 'READER'
FROM LoanSlipPayInfos LSPI join LoanSlipPays LSP on LSPI.LSP_ID = LSP.LSP_ID join Books BO on LSPI.BO_ID = BO.BO_ID join BookTitles BOT on BO.BOT_ID = BOT.BOT_ID join Librarians LIB on LSP.LIBA_ID = LIB.LIBA_ID join Readers RD on LSP.RD_ID = RD.RD_ID
WHERE LSPI.datePay is NULL

---5.Hiển thị mã sách, tên sách, sắp xếp giảm dần theo số lần mượn
SELECT BO.BO_ID as 'ID BOOK', BOT.BOT_name as 'NAME BOOK', COUNT(BO.BO_ID) AS 'NUMBER LOAN'
FROM LoanSlipPayInfos LSPI join Books BO on LSPI.BO_ID = BO.BO_ID join BookTitles BOT on BO.BOT_ID = BOT.BOT_ID
GROUP BY BO.BO_ID, BOT.BOT_name
ORDER BY COUNT(BO.BO_ID)
-- viết thử thôi chưa chắc đúng