module ResponseData
  extend ActiveSupport::Concern

  def entity_save_data(entity, completed)
    if completed
      { completed: true, entity: "#{entity.class}Serializer".constantize.new(entity).attributes }
    else
      { completed: false, errors: entity.errors.full_messages }
    end
  end
end
