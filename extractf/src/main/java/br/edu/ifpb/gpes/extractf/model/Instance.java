
package br.edu.ifpb.gpes.extractf.model;

/**
 *
 * @author natan
 */
class Instance {
    private String name;
    private String element;
    
    public Instance() {
        
    }
    
    public Instance(String name, String element) {
        this.name = name;
        this.element = element;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getElement() {
        return element;
    }

    public void setElement(String element) {
        this.element = element;
    }

    @Override
    public String toString() {
        return "Instance{" + "name=" + name + ", element=" + element + '}';
    }
    
    
}
