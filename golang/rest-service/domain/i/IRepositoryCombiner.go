package domainInterface

// IRepositoryCombiner is interface brings together the interfaces for the repository.
type IRepositoryCombiner interface {
	User() IUserRepository
}
