package domainInterface

// This interface brings together the interfaces for the repository.
type IRepositoryCombiner interface {
	User() IUserRepository
}
