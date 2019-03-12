
package br.edu.ifpb.gpes.shared;

/**
 *
 * @author natan
 */
public class Role {
    private String name;
    private String element;
    
    public Role() {
        
    }
    
    public Role(String name, String element) {
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
        return "Role{" + "name=" + name + ", element=" + element + '}';
    }
    
    
}
