package domain_i

type IRepositoryCombiner interface {
	User() IUserRepository
}
