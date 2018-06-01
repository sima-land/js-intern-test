package models


//DeleteUser - меняет имя польз. по ID 
//возвращает текст ошибки "для пользователя" если что-то пошло не так
func DeleteUser(id int) (string, error) {
	result, err := conn.Exec("delete from users where id=?", id)
	if err != nil {
		return "внутренняя ошибка", err
	}
	affected, err := result.RowsAffected()
	if err != nil {
		return "внутренняя ошибка", err
	}
	if affected == 0 {
		return "не найден пользователь с данным ID", nil
	}
	return "", nil
}
