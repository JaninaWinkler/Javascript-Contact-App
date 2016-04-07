class Contact < ActiveRecord::Base

  validates :name, presence: true
  validates :email, presence: true
  validates :phone_number, numericality: { only_integer: true }

end